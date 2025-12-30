from typing import Optional
from uuid import UUID

from pydantic import computed_field

import bridg.alchemy

from ..base import BaseModel


class TelecommunicationAddressData(BaseModel[bridg.alchemy.common.person.TelecommunicationAddress]):
    _sa = bridg.alchemy.common.person.TelecommunicationAddress

    use: Optional[Optional[bridg.alchemy.datatype.TelecommunicationAddressUse]] = None
    scheme: Optional[Optional[bridg.alchemy.datatype.URLScheme]] = None
    address: Optional[str] = None


class TelecommunicationAddress(TelecommunicationAddressData):
    id: UUID

    @computed_field
    @property
    def label(self) -> str:
        if self.address is None:
            return "No address data"
        return self.address
