from typing import Annotated
from uuid import UUID

from pydantic import Field

from ..base import BaseModel
from ..common import Biologic, Material, Product


class Specimen(BaseModel):
    id: UUID
    performing_material: Annotated[
        Material | Product | Biologic,
        Field(discriminator="type"),
    ]
