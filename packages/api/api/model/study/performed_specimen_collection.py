from typing import Annotated, List
from uuid import UUID

import bridg
from pydantic import Field

from ..base import BaseModel
from ..common import Biologic, BiologicData, Material, MaterialData, Product, ProductData
from .performed_procedure import PerformedProcedure, PerformedProcedureData


class ProducedSpecimen(BaseModel[bridg.Specimen]):
    id: UUID
    performing_material: Annotated[
        Material | Product | Biologic,
        Field(discriminator="type", json_schema_extra=dict(title="Performing Material")),
    ]


class ProducedSpecimenData(BaseModel[bridg.Specimen]):
    _sa = bridg.Specimen

    performing_material: Annotated[
        MaterialData | ProductData | BiologicData,
        Field(discriminator="type", json_schema_extra=dict(title="Performing Material Data")),
    ]


class PerformedSpecimenCollection(PerformedProcedure[bridg.PerformedSpecimenCollection]):
    produced_specimen: List[ProducedSpecimen]


class PerformedSpecimenCollectionData(PerformedProcedureData[bridg.PerformedSpecimenCollection]):
    produced_specimen: List[ProducedSpecimenData]
