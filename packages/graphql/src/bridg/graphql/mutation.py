from typing import Type, get_origin

import strawberry
from sqlalchemy import inspect
from sqlalchemy.orm import Composite, Relationship

import bridg.alchemy

from .common import Person, PersonInput
from .context import Context


def get_concrete_class[T: bridg.alchemy.Base](input, class_: Type[T]) -> Type[T]:
    ins = inspect(class_)
    if (polymorphic_on := ins.polymorphic_on) is not None:
        if polymorphic_value := getattr(input, polymorphic_on.name, None):
            return ins.polymorphic_map[polymorphic_value].class_
    return class_


def _convert[T: bridg.alchemy.Base](
    input, class_: Type[T], terminology: bridg.alchemy.TerminologyService | None = None
) -> T:
    if class_ == bridg.alchemy.ConceptDescriptor:
        if terminology is None:
            raise RuntimeError("TerminologyService required")
        return terminology.get_or_create(input.code, input.code_system, input.display_name)  # type: ignore

    class_ = get_concrete_class(input, class_)
    ins = inspect(class_)
    # hints = get_type_hints(class_, localns=bridg.alchemy.__dict__)
    output = class_()
    for key, field in input.__dataclass_fields__.items():
        value = getattr(input, key, None)

        # Handle maybe
        if get_origin(field.type) == strawberry.Maybe or (
            isinstance(field.type, str) and (field.type.startswith("strawberry.Maybe"))
        ):
            if value is None:
                continue
            value = value.value

        if value is not None:
            if attr := ins.attrs.get(key):
                if isinstance(attr, Relationship):
                    attr_class_ = attr.entity.class_
                    if attr.uselist:
                        value = [_convert(v, attr_class_, terminology=terminology) for v in value]
                    else:
                        value = _convert(value, attr_class_, terminology=terminology)
                elif isinstance(attr, Composite):
                    attr_class_ = attr.composite_class
                    value = attr_class_(**{k: getattr(value, k) for k in attr_class_.__dataclass_fields__.keys()})
                else:
                    # raise RuntimeError(f"Unknown attr {key} type in the model {class_.__name__}")
                    # it must be primitive, so just don't convert
                    pass
            else:
                raise RuntimeError(f"There's no attr {key} in the model {class_.__name__}")

        setattr(output, key, value)

    return output


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
