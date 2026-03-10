from polyfactory import Use

from bridg.graphql.schema import InstanceIdentifier

from ..base import BaseFactory


class InstanceIdentifierFactory(BaseFactory[InstanceIdentifier]):
    root = Use(lambda: BaseFactory.__random__.choice(["PSN"]))
    extension = Use(BaseFactory.__faker__.ssn)
