from typing import Annotated, Optional
from uuid import UUID

import bridg
from pydantic import Field

from ..base import BaseModel
from ..common import Biologic, Material, Product
from ..study import PerformedProcedure


class ProducingPerformedSpecimenCollection(PerformedProcedure[bridg.PerformedSpecimenCollection]):
    pass


class Specimen(BaseModel):
    id: UUID
    performing_material: Annotated[
        Material | Product | Biologic,
        Field(discriminator="type", json_schema_extra=dict(title="Performing Material")),
    ]
    producing_performed_specimen_collection: Optional[ProducingPerformedSpecimenCollection]
