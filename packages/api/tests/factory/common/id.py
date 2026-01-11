from bridg.api.model import ID

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory, InstanceIdentifierFactory


class IDFactory(BaseFactory[ID]):
    identifier: InstanceIdentifierFactory
    identifier_type_code = ConceptDescriptorFactory
