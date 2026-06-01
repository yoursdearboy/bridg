from polyfactory import Use

from bridg.graphql.schema import IDInput

from ..base import BaseFactory


class IDInputFactory(BaseFactory[IDInput]):
    identifier = Use(BaseFactory.__faker__.ssn)
    identifier_type_code = None
    sequence = None
