from typing import Optional

from pydantic import computed_field

import bridg.alchemy

from ..base import BaseModel


class PostalAddressData[T: bridg.alchemy.PostalAddress](BaseModel[T]):
    use: Optional[str] = None
    street: Optional[str] = None
    building: Optional[str] = None
    country: Optional[str] = None
    municipality: Optional[str] = None
    state: Optional[str] = None
    zip: Optional[str] = None


class PostalAddress[T: bridg.alchemy.PostalAddress](PostalAddressData[T]):
    @computed_field
    @property
    def label(self) -> str:
        parts = [self.street, self.building, self.municipality, self.state, self.country, self.zip]
        parts = [p for p in parts if p]
        s = ", ".join(parts)
        s = "No address data" if s == "" else s
        return s
