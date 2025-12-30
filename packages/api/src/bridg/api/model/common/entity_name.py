from typing import Optional
from uuid import UUID

from pydantic import computed_field

import bridg.alchemy

from ..base import BaseModel


class EntityNameData(BaseModel[bridg.alchemy.EntityName]):
    _sa = bridg.alchemy.EntityName

    use: Optional[str] = None
    family: Optional[str] = None
    given: Optional[str] = None
    middle: Optional[str] = None
    patronymic: Optional[str] = None
    prefix: Optional[str] = None
    suffix: Optional[str] = None


class EntityName(EntityNameData):
    id: UUID

    @computed_field
    @property
    def label(self) -> Optional[str]:
        parts = [self.prefix, self.given, self.middle, self.family, self.suffix]
        parts = [p for p in parts if p]
        s = " ".join(parts).strip()
        if s == "":
            return
        return s
