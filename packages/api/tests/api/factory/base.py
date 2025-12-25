from typing import TypeVar

from polyfactory.factories.pydantic_factory import ModelFactory

from api.model.base import BaseModel

T = TypeVar("T", bound=BaseModel)


class BaseFactory(ModelFactory[T]):
    __is_base_factory__ = True
    __check_model__ = True
