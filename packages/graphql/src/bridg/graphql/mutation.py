import re
import typing
from dataclasses import is_dataclass
from typing import Annotated, Any, List, Type, get_args, get_origin

import bridg.alchemy
import strawberry
from sqlalchemy import inspect
from sqlalchemy.orm import Composite, Relationship

from .common import Person, PersonInput
from .context import Context
from .datatype import ConceptDescriptor


def get_concrete_class[T: bridg.alchemy.Base](input, class_: Type[T]) -> Type[T]:
    insp = inspect(class_)
    if (polymorphic_on := insp.polymorphic_on) is not None:
        if polymorphic_value := getattr(input, polymorphic_on.name, None):
            return insp.polymorphic_map[polymorphic_value].class_
    return class_


_maybe_re = re.compile(r"^(?:strawberry\.)?Maybe\[(.+)\]$")


def _annotation_is_maybe(annotation: Any) -> bool:
    if isinstance(annotation, str):
        # Ideally we would try to evaluate the annotation, but the args inside
        # may still not be available, as the module is still being constructed.
        # Checking for the pattern should be good enough for now.
        return _maybe_re.match(annotation) is not None

    orig = typing.get_origin(annotation)
    if orig is Annotated:
        return _annotation_is_maybe(typing.get_args(annotation)[0])
    return orig is strawberry.Maybe


class Converter:
    def __init__(self) -> None:
        self._registry = []

    # TODO: extra classmethod?
    def register(self, from_=None, to=None):
        def decorator(f):
            self._registry.append((from_, to, f))
            return f

        return decorator

    # TODO: Move context to init?
    # TODO: Pass converter itself as first argument or make registered converters classy?
    def convert[T](self, input, class_: Type[T], terminology: bridg.alchemy.TerminologyService | None = None) -> T:
        for from_, to, f in self._registry:
            if from_ is not None:
                if isinstance(from_, type):
                    if not isinstance(input, from_):
                        continue
                elif callable(from_):
                    if not from_(input):
                        continue
                else:
                    raise RuntimeError("Unknown from_ predicate")
            if to is not None:
                if isinstance(to, type):
                    if not issubclass(class_, to):
                        continue
                elif callable(to):
                    if not to(class_):
                        continue
                else:
                    raise RuntimeError("Unknown to predicate")
            return f(input, class_, terminology=terminology)
        raise RuntimeError(f"Can't comvert to {class_.__name__}")


converter = Converter()


@converter.register(to=is_dataclass)
def _to_dataclass[T](x, class_: Type[T], *args, **kwargs) -> T:
    return class_(
        **{k: getattr(x, k) for k in class_.__dataclass_fields__.keys()},  # type: ignore
    )


@converter.register(to=lambda x: get_origin(x) is list)
def _list_to_list[T](x, class_: List[Type[T]], *args, **kwargs) -> List[T]:
    (arg,) = get_args(class_)
    return [converter.convert(y, arg, *args, **kwargs) for y in x]


@converter.register(is_dataclass, to=bridg.alchemy.ConceptDescriptor)
def _object_to_cd(
    x: ConceptDescriptor, class_, *, terminology: bridg.alchemy.TerminologyService
) -> bridg.alchemy.ConceptDescriptor:
    return terminology.get_or_create(x.code, x.code_system, x.display_name)


@converter.register(str, to=bridg.alchemy.ConceptDescriptor)
def _str_to_cd(x: str, class_, *, terminology: bridg.alchemy.TerminologyService) -> bridg.alchemy.ConceptDescriptor:
    try:
        code_system, code = x.split("/", 1)
    except ValueError:
        raise Exception("String representation of ConceptDescriptor must be code_system/code")
    cd = ConceptDescriptor(code_system=code_system, code=code, display_name=None)
    return converter.convert(cd, class_, terminology=terminology)


@converter.register(to=bridg.alchemy.Base)
def _object_to_alchemy[T: bridg.alchemy.Base](x, class_: Type[T], *args, **kwargs) -> T:
    class_ = get_concrete_class(x, class_)
    insp = inspect(class_)
    output = class_()
    for key, field in x.__dataclass_fields__.items():
        value = getattr(x, key, None)

        if _annotation_is_maybe(field.type):
            if value is None:
                continue
            value = value.value

        if value is not None:
            attr = insp.attrs.get(key)

            if attr is None:
                raise RuntimeError(f"There's no attr {key} in the model {class_.__name__}")

            if isinstance(attr, Relationship):
                attr_class_ = attr.entity.class_
                if attr.uselist:
                    attr_class_ = List[attr_class_]
                value = converter.convert(value, attr_class_, *args, **kwargs)

            if isinstance(attr, Composite):
                attr_class_ = attr.composite_class
                assert isinstance(attr_class_, type)
                value = converter.convert(value, attr_class_, *args, **kwargs)

            # otherwise it must be primitive, so just don't convert

        setattr(output, key, value)

    return output


@strawberry.type
class Mutation:
    @strawberry.mutation
    def person(self, input: PersonInput, info: strawberry.Info[Context]) -> Person:
        session = info.context.session
        terminology = info.context.terminology
        person = converter.convert(input, bridg.alchemy.Person, terminology=terminology)
        person = session.merge(person)
        session.commit()
        return person  # type: ignore
