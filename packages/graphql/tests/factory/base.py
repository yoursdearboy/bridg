from polyfactory.factories.dataclass_factory import DataclassFactory

from .maybe import *  # noqa: F403


class BaseFactory[T](DataclassFactory[T]):
    __is_base_factory__ = True
    __check_model__ = True
