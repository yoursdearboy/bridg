from typing import Literal, Optional
from uuid import UUID

import bridg.alchemy

from ..base import BaseModel
from ..datatypes import ConceptDescriptor


class Material(BaseModel):
    id: UUID
    type: Literal["material"] = "material"

    code: Optional[ConceptDescriptor]
    form_code: Optional[ConceptDescriptor]
    description: Optional[str]


class MaterialData(BaseModel[bridg.alchemy.Material]):
    _sa = bridg.alchemy.Material

    id: Optional[UUID] = None
    type: Literal["material"] = "material"

    code: Optional[ConceptDescriptor]
    form_code: Optional[ConceptDescriptor]
    description: Optional[str]
