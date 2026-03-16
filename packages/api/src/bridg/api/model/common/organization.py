from typing import List, Optional
from uuid import UUID

from pydantic import Field, computed_field

import bridg.alchemy

from ..base import BaseModel
from ..datatype import OrganizationName as OrganizationNameDataType


class OrganizationNameData(OrganizationNameDataType[bridg.alchemy.OrganizationName]):
    _sa = bridg.alchemy.OrganizationName


class OrganizationName(OrganizationNameDataType[bridg.alchemy.OrganizationName]):
    id: UUID


class Organization(BaseModel):
    id: UUID
    description: Optional[str]
    name: List[OrganizationName] = Field(exclude=True)

    @computed_field
    @property
    def primary_name(self) -> Optional[OrganizationName]:
        return next(iter(self.name), None)
