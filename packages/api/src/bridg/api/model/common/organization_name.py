from typing import Optional
from uuid import UUID

from pydantic import computed_field

import bridg.alchemy

from ..base import BaseModel


class OrganizationNameData(BaseModel[bridg.alchemy.OrganizationName]):
    _sa = bridg.alchemy.OrganizationName

    value: Optional[str] = None


class OrganizationName(OrganizationNameData):
    id: UUID

    @computed_field
    @property
    def label(self) -> Optional[str]:
        return self.value
