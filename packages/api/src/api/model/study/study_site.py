from typing import Optional
from uuid import UUID

import bridg
from pydantic import Field, computed_field

from ..base import BaseModel


class StudySite(BaseModel):
    id: UUID
    performing_healthcare_facility: Optional[bridg.HealthcareFacility] = Field(exclude=True)
    performing_organization: Optional[bridg.Organization] = Field(exclude=True)

    @computed_field
    @property
    def label(self) -> Optional[str]:
        if hf := self.performing_healthcare_facility:
            return str(hf.performing_organization)
        if org := self.performing_organization:
            return str(org)
