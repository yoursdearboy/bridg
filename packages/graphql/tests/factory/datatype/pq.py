from polyfactory import Use

from bridg.graphql.schema import PhysicalQuantity

from ..base import BaseFactory


class PhysicalQuantityFactory(BaseFactory[PhysicalQuantity]):
    __set_as_default_factory_for_type__ = True

    value = Use(lambda: BaseFactory.__faker__.random_number(2))
    unit = Use(lambda: BaseFactory.__random__.choice(["s", "m", "kg", "m2", "m3", "10^9/l"]))
