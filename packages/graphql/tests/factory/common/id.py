from bridg.graphql.schema import IDInput

from ..base import BaseFactory
from ..datatype import InstanceIdentifierFactory


class IDInputFactory(BaseFactory[IDInput]):
    identifier = InstanceIdentifierFactory
    identifier_type_code = None
