from polyfactory.factories.pydantic_factory import ModelFactory

from bridg.api.model.base import BaseModel


class BaseFactory[T: BaseModel](ModelFactory[T]):
    __is_base_factory__ = True
    __check_model__ = True
