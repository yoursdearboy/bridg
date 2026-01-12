from typing import List, Optional
from uuid import UUID

from pydantic import Field, computed_field

import bridg.alchemy

from ..base import BaseModel
from ..datatype import OrganizationName


class OrganizationOrganizationNameData(OrganizationName[bridg.alchemy.OrganizationOrganizationName]):
    _sa = bridg.alchemy.OrganizationOrganizationName


class OrganizationOrganizationName(OrganizationName[bridg.alchemy.OrganizationOrganizationName]):
    id: UUID


class Organization(BaseModel):
    id: UUID
    description: Optional[str]
    name: List[OrganizationOrganizationName] = Field(exclude=True)

    @computed_field
    @property
    def primary_name(self) -> Optional[OrganizationOrganizationName]:
        return next(iter(self.name), None)
