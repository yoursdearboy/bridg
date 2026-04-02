import logging
from types import FunctionType
from typing import Any, List, Optional, Type, Union, get_args, get_type_hints
from uuid import UUID

from sqlalchemy import inspect
from sqlalchemy.ext.associationproxy import AssociationProxy, ObjectAssociationProxyInstance
from sqlalchemy.orm import Composite, Relationship

import bridg.alchemy
import bridg.common.converter

from .dataclass import Dataclass
from .maybe import _annotation_is_maybe
from .schema import ConceptDescriptor

logger = logging.getLogger(__name__)


class Converter(bridg.common.converter.Converter):
    def __init__(self, terminology: bridg.alchemy.TerminologyService) -> None:
        super().__init__(
            [
                any_to_optional,
                object_to_dataclass,
                list_to_list,
                object_to_cd,
                str_to_cd,
                str_to_uuid,
                object_to_alchemy,
                fallback,
            ]
        )
        self.terminology = terminology


@bridg.common.converter.configure
def any_to_optional[T](x: Any, class_: Type[Optional[T]], converter) -> Optional[T]:
    if x is None:
        return
    args = get_args(class_)[:-1]
    if len(args) == 1:
        type_ = args[0]
    else:
        type_ = Union[tuple(args)]
    return converter.convert(x, type_)


@bridg.common.converter.configure
def object_to_dataclass(x: Any, class_) -> Dataclass:
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


@bridg.common.converter.configure
def str_to_uuid(x: str) -> UUID:
    return UUID(x)


@bridg.common.converter.configure
def fallback(x: Any, class_) -> Any:
    # FIXME: replace with identity instead
    logger.debug(f"Fallback converter used on value of type {type(x)} to convert to {class_}")
    return x


def get_concrete_class[T: bridg.alchemy.Base](input, class_: Type[T]) -> Type[T]:
    insp = inspect(class_)
    if (polymorphic_on := insp.polymorphic_on) is not None:
        if polymorphic_value := getattr(input, polymorphic_on.name, None):
            return insp.polymorphic_map[polymorphic_value].class_
    return class_


@bridg.common.converter.configure
def object_to_alchemy[T: bridg.alchemy.Base](x: Any, class_: Type[T], converter) -> T:
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
            desc = insp.all_orm_descriptors.get(key)
            prop = getattr(class_, key)

            if isinstance(attr, Relationship):
                attr_class_ = attr.entity.class_
                if attr.uselist:
                    attr_class_ = List[attr_class_]
                value = converter.convert(value, attr_class_)
            elif isinstance(attr, Composite):
                attr_class_ = attr.composite_class
                if isinstance(attr_class_, type):
                    value = converter.convert(value, attr_class_)
                elif isinstance(attr_class_, FunctionType):
                    type_ = get_type_hints(attr_class_)["return"]
                    value = converter.convert(value, type_)
                else:
                    RuntimeError("Unknown Composite attr configuration")
            elif attr:
                type_ = attr.columns[0].type.python_type
                value = converter.convert(value, type_)
            elif isinstance(desc, AssociationProxy):
                proxy = getattr(class_, key)
                assert isinstance(proxy, ObjectAssociationProxyInstance)
                assert issubclass(proxy.target_class, bridg.alchemy.Base)

                insp2 = inspect(proxy.target_class)
                attr2 = insp2.attrs.get(proxy.value_attr)
                assert isinstance(attr2, Relationship)
                attr2_class_ = List[attr2.entity.class_]
                value = converter.convert(value, attr2_class_)
            elif isinstance(prop, property):
                type_ = next(iter(get_type_hints(prop.fset).values()), None)
                if type_ is None:
                    raise RuntimeError("Unknown setter argument type")
                value = converter.convert(value, type_)
            else:
                raise RuntimeError(f"There's no attr {key} in the model {class_.__name__}")

        setattr(output, key, value)

    return output
