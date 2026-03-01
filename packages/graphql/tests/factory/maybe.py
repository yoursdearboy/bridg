from abc import abstractmethod
from typing import Any, TypeGuard

from polyfactory.factories import BaseFactory
from strawberry import Maybe, Some


class MaybeFactory(BaseFactory[Maybe]):
    __set_as_default_factory_for_type__ = True

    @classmethod
    @abstractmethod
    def is_supported_type(cls, value: Any) -> TypeGuard[type[Maybe]]:
        print("WE WERE HERE")
        return True

    @classmethod
    @abstractmethod
    def get_model_fields(cls) -> list:
        return []

    @classmethod
    def build(cls, *args, **kwargs) -> Maybe:
        print("WE ARE HERE")
        return Some(None)
