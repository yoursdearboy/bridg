from typing import Literal, Optional
from uuid import UUID

from ..base import BaseModel
from ..datatypes import ConceptDescriptor


class Material(BaseModel):
    id: UUID
    type: Literal["material"] = "material"

    code: Optional[ConceptDescriptor]
    form_code: Optional[ConceptDescriptor]
    description: Optional[str]
