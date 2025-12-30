from typing import Optional
from uuid import UUID

from ..base import BaseModel
from ..datatypes import ConceptDescriptor


class DefinedActivity(BaseModel):
    id: UUID
    name_code: ConceptDescriptor
    category_code: Optional[ConceptDescriptor]
    subcategory_code: Optional[ConceptDescriptor]
    description: Optional[str]
