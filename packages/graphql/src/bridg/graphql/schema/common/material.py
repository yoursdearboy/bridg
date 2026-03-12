from typing import List, Optional

import strawberry

from ..datatype import ConceptDescriptor
from .id import ID


@strawberry.type
class Material:
    id: strawberry.ID
    type: str
    identifier: List[ID]
    code: Optional[ConceptDescriptor]
    form_code: Optional[ConceptDescriptor]
    description: Optional[str]
