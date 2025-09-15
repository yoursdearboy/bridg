from typing import Optional
from uuid import UUID

import bridg
from pydantic import computed_field

from api.base_model import BaseModel


class TelecommunicationAddressData(BaseModel[bridg.common.person.TelecommunicationAddress]):
    _sa = bridg.common.person.TelecommunicationAddress

    use: Optional[str] = None
    scheme: Optional[str] = None
    address: Optional[str] = None


class TelecommunicationAddress(TelecommunicationAddressData):
    id: UUID

    @computed_field
    @property
    def label(self) -> str:
        if self.address is None:
            return "No address data"
        return self.address
