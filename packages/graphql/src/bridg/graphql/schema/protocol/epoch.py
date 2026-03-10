from typing import Optional

import strawberry

from ..datatype import ConceptDescriptor


@strawberry.type
class Epoch:
    id: strawberry.ID
    name: Optional[str]
    type_code: Optional[ConceptDescriptor]
    sequence_number: Optional[str]
    description: Optional[str]
