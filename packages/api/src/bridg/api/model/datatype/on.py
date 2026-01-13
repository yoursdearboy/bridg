from typing import Optional

from pydantic import computed_field

import bridg.alchemy

from ..base import BaseModel


class OrganizationNameData[T: bridg.alchemy.OrganizationName](BaseModel[T]):
    value: Optional[str] = None


class OrganizationName[T: bridg.alchemy.OrganizationName](OrganizationNameData[T]):
    @computed_field
    @property
    def label(self) -> Optional[str]:
        return self.value
