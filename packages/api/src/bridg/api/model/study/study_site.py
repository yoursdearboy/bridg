from typing import Optional
from uuid import UUID

from pydantic import Field, computed_field

import bridg.alchemy

from ..base import BaseModel


class StudySite(BaseModel):
    id: UUID
    performing_healthcare_facility: Optional[bridg.alchemy.HealthcareFacility] = Field(exclude=True)
    performing_organization: Optional[bridg.alchemy.Organization] = Field(exclude=True)

    @computed_field
    @property
    def label(self) -> Optional[str]:
        if hf := self.performing_healthcare_facility:
            return str(hf.performing_organization)
        if org := self.performing_organization:
            return str(org)
