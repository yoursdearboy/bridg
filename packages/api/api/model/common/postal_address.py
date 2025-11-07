from typing import Optional
from uuid import UUID

import bridg
from pydantic import computed_field

from ..base import BaseModel


class PostalAddressData(BaseModel[bridg.common.person.PostalAddress]):
    _sa = bridg.common.person.PostalAddress

    use: Optional[str] = None
    street: Optional[str] = None
    building: Optional[str] = None
    country: Optional[str] = None
    municipality: Optional[str] = None
    state: Optional[str] = None
    zip: Optional[str] = None


class PostalAddress(PostalAddressData):
    id: UUID

    @computed_field
    @property
    def label(self) -> str:
        parts = [self.street, self.building, self.municipality, self.state, self.country, self.zip]
        parts = [p for p in parts if p]
        s = ", ".join(parts)
        s = "No address data" if s == "" else s
        return s
