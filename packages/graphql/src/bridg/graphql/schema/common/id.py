from typing import Optional

import strawberry

from ..datatype import ConceptDescriptor, InstanceIdentifier


@strawberry.type(name="Identifier")
class ID:
    identifier: InstanceIdentifier
    identifier_type_code: Optional[ConceptDescriptor]


@strawberry.input(name="IdentifierInput")
class IDInput:
    identifier: InstanceIdentifier
    identifier_type_code: strawberry.Maybe[ConceptDescriptor]
