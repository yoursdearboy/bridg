import re
import typing
from typing import Annotated, Any, ClassVar, List, Mapping, Protocol, Type, get_args, runtime_checkable

import strawberry
from sqlalchemy import inspect
from sqlalchemy.orm import Composite, Relationship

import bridg.alchemy
import bridg.common.converter

from .context import Context
from .datatype import ConceptDescriptor

converter = bridg.common.converter.Converter()


@runtime_checkable
class Dataclass(Protocol):
    __dataclass_fields__: ClassVar[Mapping[str, Any]]


@converter.register(to=Dataclass)
def _object_to_dataclass[T: Dataclass](x, class_: Type[T]) -> T:
    return class_(**{k: getattr(x, k) for k in class_.__dataclass_fields__.keys()})


@converter.register()
def _list_to_list[T](x, class_: Type[List[T]], context: Context) -> List[T]:
    (arg,) = get_args(class_)
    return [context.convert(y, arg, context=context) for y in x]


@converter.register()
def _str_to_cd(
    x: str, class_: Type[bridg.alchemy.ConceptDescriptor], context: Context
) -> bridg.alchemy.ConceptDescriptor:
    try:
        code_system, code = x.split("/", 1)
    except ValueError:
        raise Exception("String representation of ConceptDescriptor must be code_system/code")
    cd = ConceptDescriptor(code_system=code_system, code=code, display_name=None)
    return context.convert(cd, class_, context=context)


@converter.register()
def _object_to_cd(
    x: ConceptDescriptor, class_: Type[bridg.alchemy.ConceptDescriptor], context: Context
) -> bridg.alchemy.ConceptDescriptor:
    return context.terminology.get_or_create(x.code, x.code_system, x.display_name)


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


@converter.register(to=bridg.alchemy.Base)
def _object_to_alchemy[T: bridg.alchemy.Base](x, class_: Type[T], context: Context) -> T:
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
                value = context.convert(value, attr_class_, context=context)

            if isinstance(attr, Composite):
                attr_class_ = attr.composite_class
                assert isinstance(attr_class_, type)
                value = context.convert(value, attr_class_, context=context)

            # otherwise it must be primitive, so just don't convert

        setattr(output, key, value)

    return output
