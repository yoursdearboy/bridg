from typing import List, Literal, Optional
from uuid import UUID

import bridg.alchemy

from ..base import BaseModel
from ..datatype import ConceptDescriptor
from .id import ID


class MaterialIdentifier(ID[bridg.alchemy.MaterialIdentifier]):
    _sa = bridg.alchemy.MaterialIdentifier


class Material(BaseModel):
    id: UUID
    type: Literal["material"] = "material"

    identifier: List[MaterialIdentifier]

    code: Optional[ConceptDescriptor]
    form_code: Optional[ConceptDescriptor]
    description: Optional[str]


class MaterialData(BaseModel[bridg.alchemy.Material]):
    _sa = bridg.alchemy.Material

    id: Optional[UUID] = None
    type: Literal["material"] = "material"

    identifier: List[MaterialIdentifier]

    code: Optional[ConceptDescriptor]
    form_code: Optional[ConceptDescriptor]
    description: Optional[str]
