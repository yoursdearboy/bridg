from polyfactory import Use

from bridg.api.model import InstanceIdentifier

from ..base import BaseFactory


class InstanceIdentifierFactory(BaseFactory[InstanceIdentifier]):
    __set_as_default_factory_for_type__ = True

    root = Use(lambda: BaseFactory.__random__.choice(["PSN"]))
    extension = Use(BaseFactory.__faker__.ssn)
