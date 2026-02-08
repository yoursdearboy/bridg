import re
import typing
from dataclasses import is_dataclass
from typing import Annotated, Any, List, Type, get_args, get_origin

import strawberry
from sqlalchemy import inspect
from sqlalchemy.orm import Composite, Relationship

import bridg.alchemy

from .common import Person, PersonInput
from .context import Context


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


def _convert[T](input, class_: Type[T], terminology: bridg.alchemy.TerminologyService | None = None) -> T:
    if is_dataclass(class_):
        return class_(**{k: getattr(input, k) for k in class_.__dataclass_fields__.keys()})

    if get_origin(class_) is list:
        (arg,) = get_args(class_)
        return [_convert(x, arg, terminology=terminology) for x in input]  # type: ignore

    if class_ == bridg.alchemy.ConceptDescriptor:
        if terminology is None:
            raise RuntimeError("TerminologyService required")
        return terminology.get_or_create(input.code, input.code_system, input.display_name)  # type: ignore

    if issubclass(class_, bridg.alchemy.Base):
        class_ = get_concrete_class(input, class_)
        insp = inspect(class_)
        output = class_()
        for key, field in input.__dataclass_fields__.items():
            value = getattr(input, key, None)

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
                    value = _convert(value, attr_class_, terminology=terminology)

                if isinstance(attr, Composite):
                    attr_class_ = attr.composite_class
                    assert isinstance(attr_class_, type)
                    value = _convert(value, attr_class_, terminology=terminology)

                # otherwise it must be primitive, so just don't convert

            setattr(output, key, value)
        return output

    raise RuntimeError(f"Can't comvert to {class_.__name__}")


@strawberry.type
class Mutation:
    @strawberry.mutation
    def person(self, input: PersonInput, info: strawberry.Info[Context]) -> Person:
        session = info.context.session
        terminology = info.context.terminology
        person = _convert(input, bridg.alchemy.Person, terminology=terminology)
        person = session.merge(person)
        session.commit()
        return person  # type: ignore
