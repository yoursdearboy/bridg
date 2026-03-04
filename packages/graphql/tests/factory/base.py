from polyfactory.factories.dataclass_factory import DataclassFactory


class BaseFactory[T](DataclassFactory[T]):
    __is_base_factory__ = True
    __check_model__ = True
