from typing import Optional

import strawberry

import bridg.alchemy

from .url import URL, URLInput


@strawberry.type
class TelecommunicationAddress(URL):
    use: Optional[bridg.alchemy.TelecommunicationAddressUse]


@strawberry.input
class TelecommunicationAddressInput(URLInput):
    use: strawberry.Maybe[Optional[bridg.alchemy.TelecommunicationAddressUse]]
