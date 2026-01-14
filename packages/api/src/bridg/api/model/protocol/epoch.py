from typing import Optional
from uuid import UUID

from ..base import BaseModel
from ..datatype import ConceptDescriptor


class Epoch(BaseModel):
    id: UUID
    name: Optional[str]
    type_code: Optional[ConceptDescriptor]
    description: Optional[str]
