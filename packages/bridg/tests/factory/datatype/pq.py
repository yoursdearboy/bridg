from polyfactory import Use
from polyfactory.factories.dataclass_factory import DataclassFactory

from bridg import PhysicalQuantity

from ..base import BaseFactory


class PhysicalQuantityFactory(DataclassFactory[PhysicalQuantity]):
    __set_as_default_factory_for_type__ = True

    value = Use(lambda: BaseFactory.__faker__.random_number(2))
    unit = Use(lambda: BaseFactory.__random__.choice(["s", "m", "kg", "m2", "m3", "10^9/l"]))
