from typing import Optional

import strawberry

from ..datatype import ConceptDescriptor, InstanceIdentifier


@strawberry.type
class ID:
    identifier: InstanceIdentifier
    identifier_type_code: Optional[ConceptDescriptor]


@strawberry.input
class IDInput:
    identifier: InstanceIdentifier
    identifier_type_code: strawberry.Maybe[ConceptDescriptor]
