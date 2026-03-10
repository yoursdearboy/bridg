from abc import abstractmethod
from typing import Any, Callable, TypeGuard, get_args

from polyfactory.factories import BaseFactory
from polyfactory.field_meta import FieldMeta, Null
from polyfactory.value_generators.primitives import create_random_boolean
from strawberry import Maybe, Some

from bridg.graphql.maybe import _annotation_is_maybe


def make_some[T](fn: Callable[..., T]) -> Callable[..., Some[T]]:
    def f(*args, **kwargs):
        return Some(fn(*args, **kwargs))

    return f


class MaybeFactory(BaseFactory[Maybe]):
    __is_base_factory__ = True

    @classmethod
    @abstractmethod
    def is_supported_type(cls, value: Any) -> TypeGuard[type[Maybe]]:
        return _annotation_is_maybe(value)

    @classmethod
    @abstractmethod
    def get_model_fields(cls) -> list[FieldMeta]:
        (annotation,) = get_args(cls.__model__)
        default_value = Null
        return [
            FieldMeta.from_type(
                annotation=annotation,
                name="arg",
                default=default_value,
            )
        ]

    @classmethod
    def build(cls, *args: Any, **kwargs: Any) -> Maybe:
        if create_random_boolean(cls.__random__):
            return None
        (field,) = cls.get_model_fields()
        value = cls.get_field_value(field)
        return Some(value)
