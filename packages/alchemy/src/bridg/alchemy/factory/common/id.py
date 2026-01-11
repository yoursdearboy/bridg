from polyfactory import Ignore, Use

from bridg.alchemy import ID

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory


class IDFactory[T: ID](BaseFactory[T]):
    __is_base_factory__ = True

    identifier = Ignore()
    identifier_root = Use(lambda: BaseFactory.__random__.choice(["SSN"]))
    identifier_extension = Use(BaseFactory.__faker__.ssn)

    identifier_type_code_id = Ignore()
    identifier_type_code = ConceptDescriptorFactory
