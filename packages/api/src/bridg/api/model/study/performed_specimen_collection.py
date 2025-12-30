from typing import Annotated, List, Optional
from uuid import UUID

from pydantic import Field

import bridg.alchemy

from ..base import BaseModel
from ..common import Biologic, BiologicData, Material, MaterialData, Product, ProductData
from .performed_procedure import PerformedProcedure, PerformedProcedureData


class ProducedSpecimen(BaseModel[bridg.alchemy.Specimen]):
    id: UUID
    performing_material: Annotated[
        Material | Product | Biologic,
        Field(discriminator="type", json_schema_extra=dict(title="Performing Material")),
    ]


class ProducedSpecimenData(BaseModel[bridg.alchemy.Specimen]):
    _sa = bridg.alchemy.Specimen

    id: Optional[UUID] = None
    performing_material: Annotated[
        MaterialData | ProductData | BiologicData,
        Field(discriminator="type", json_schema_extra=dict(title="Performing Material Data")),
    ]


class PerformedSpecimenCollection(PerformedProcedure[bridg.alchemy.PerformedSpecimenCollection]):
    produced_specimen: List[ProducedSpecimen]


class PerformedSpecimenCollectionData(PerformedProcedureData[bridg.alchemy.PerformedSpecimenCollection]):
    _sa = bridg.alchemy.PerformedSpecimenCollection

    produced_specimen: List[ProducedSpecimenData]
