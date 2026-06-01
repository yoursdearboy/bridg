from typing import Optional

import strawberry

from ..datatype import ConceptDescriptor


@strawberry.type(name="Identifier")
class ID:
    identifier: str
    identifier_type_code: Optional[ConceptDescriptor]


@strawberry.input(name="IdentifierInput")
class IDInput:
    identifier: strawberry.Maybe[str]
    identifier_type_code: strawberry.Maybe[ConceptDescriptor]
    sequence: strawberry.Maybe[str]
