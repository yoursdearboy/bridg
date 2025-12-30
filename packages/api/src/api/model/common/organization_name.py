from typing import Optional
from uuid import UUID

import bridg
from pydantic import computed_field

from ..base import BaseModel


class OrganizationNameData(BaseModel[bridg.OrganizationName]):
    _sa = bridg.OrganizationName

    value: Optional[str] = None


class OrganizationName(OrganizationNameData):
    id: UUID

    @computed_field
    @property
    def label(self) -> Optional[str]:
        return self.value
