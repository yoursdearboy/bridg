from typing import List, Optional

import strawberry

from ..datatype import ConceptDescriptor, PhysicalQuantity
from .id import ID, IDInput


@strawberry.type
class Material:
    id: strawberry.ID
    type: str
    identifier: List[ID]
    code: Optional[ConceptDescriptor]
    form_code: Optional[ConceptDescriptor]
    description: Optional[str]
    quantity: Optional[PhysicalQuantity]


@strawberry.input
class MaterialInput:
    id: strawberry.Maybe[strawberry.ID]
    type: str
    identifier: strawberry.Maybe[List[IDInput]]
    code: strawberry.Maybe[Optional[ConceptDescriptor]]
    form_code: strawberry.Maybe[Optional[ConceptDescriptor]]
    description: strawberry.Maybe[Optional[str]]
    quantity: strawberry.Maybe[Optional[PhysicalQuantity]]
