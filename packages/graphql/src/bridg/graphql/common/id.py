import strawberry

from ..datatype import ConceptDescriptor, InstanceIdentifier


@strawberry.type
class ID:
    identifier: InstanceIdentifier
    identifier_type_code: ConceptDescriptor
