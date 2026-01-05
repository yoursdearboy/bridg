from typing import Optional

from pydantic import computed_field

import bridg.alchemy

from ..base import BaseModel


class TelecommunicationAddressData[T: bridg.alchemy.TelecommunicationAddress](BaseModel[T]):
    use: Optional[Optional[bridg.alchemy.datatype.TelecommunicationAddressUse]] = None
    scheme: Optional[Optional[bridg.alchemy.datatype.URLScheme]] = None
    address: Optional[str] = None


class TelecommunicationAddress[T: bridg.alchemy.TelecommunicationAddress](TelecommunicationAddressData[T]):
    @computed_field
    @property
    def label(self) -> str:
        if self.address is None:
            return "No address data"
        return self.address
