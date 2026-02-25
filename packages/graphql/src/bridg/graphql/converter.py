import re
import typing
from typing import Annotated, Any, List, Type, get_args

import strawberry
from sqlalchemy import inspect
from sqlalchemy.orm import Composite, Relationship

import bridg.alchemy
import bridg.common.converter

from .dataclass import Dataclass
from .datatype import ConceptDescriptor


class Converter(bridg.common.converter.Converter):
    def __init__(self, terminology: bridg.alchemy.TerminologyService) -> None:
        super().__init__(
            [
                object_to_dataclass,
                list_to_list,
                str_to_cd,
                object_to_cd,
                object_to_alchemy,
            ]
        )
        self.terminology = terminology


@bridg.common.converter.configure
def object_to_dataclass(x, class_) -> Dataclass:
    return class_(**{k: getattr(x, k) for k in class_.__dataclass_fields__.keys()})


@bridg.common.converter.configure
def list_to_list[T](x: List[T], class_, converter) -> List[T]:
    (arg,) = get_args(class_)
    return [converter.convert(y, arg) for y in x]


@bridg.common.converter.configure
def str_to_cd(x: str, _, converter) -> bridg.alchemy.ConceptDescriptor:
    try:
        code_system, code = x.split("/", 1)
    except ValueError:
        raise Exception("String representation of ConceptDescriptor must be code_system/code")
    cd = ConceptDescriptor(code_system=code_system, code=code, display_name=None)
    return converter.convert(cd, bridg.alchemy.ConceptDescriptor)


@bridg.common.converter.configure
def object_to_cd(x: ConceptDescriptor, _, converter) -> bridg.alchemy.ConceptDescriptor:
    return converter.terminology.get_or_create(x.code, x.code_system, x.display_name)


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


@bridg.common.converter.configure
def object_to_alchemy[T: bridg.alchemy.Base](x, class_: Type[T], converter) -> T:
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
                value = converter.convert(value, attr_class_)

            if isinstance(attr, Composite):
                attr_class_ = attr.composite_class
                assert isinstance(attr_class_, type)
                value = converter.convert(value, attr_class_)

            # otherwise it must be primitive, so just don't convert

        setattr(output, key, value)

    return output
