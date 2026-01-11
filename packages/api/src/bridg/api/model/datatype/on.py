from typing import Optional

from pydantic import computed_field

import bridg.alchemy

from ..base import BaseModel


class OrganizationNameData(BaseModel[bridg.alchemy.OrganizationName]):
    _sa = bridg.alchemy.OrganizationName

    value: Optional[str] = None


class OrganizationName(OrganizationNameData):
    @computed_field
    @property
    def label(self) -> Optional[str]:
        return self.value
