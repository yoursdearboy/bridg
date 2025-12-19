from typing import Annotated
from uuid import UUID

import bridg
from pydantic import Field

from ..base import BaseModel
from ..common import Biologic, BiologicData, Material, MaterialData, Product, ProductData


class Specimen(BaseModel):
    id: UUID
    performing_material: Annotated[
        Material | Product | Biologic,
        Field(discriminator="type"),
    ]


class SpecimenData(BaseModel[bridg.Specimen]):
    _sa = bridg.Specimen

    performing_material: Annotated[
        MaterialData | ProductData | BiologicData,
        Field(discriminator="type", json_schema_extra=dict(title="Performing Material Data")),
    ]
