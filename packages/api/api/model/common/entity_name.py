from typing import Optional
from uuid import UUID

import bridg
from pydantic import computed_field

from ..base import BaseModel


class EntityNameData(BaseModel[bridg.EntityName]):
    _sa = bridg.EntityName

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
    def label(self) -> str:
        parts = [self.prefix, self.given, self.middle, self.family, self.suffix]
        parts = [p for p in parts if p]
        s = " ".join(parts)
        s = "Anonymous" if s == "" else s
        return s
