from typing import Optional

import strawberry

import bridg.alchemy

from .url import URL, URLInput


@strawberry.type
class TelecommunicationAddress(URL):
    id: strawberry.ID
    use: Optional[bridg.alchemy.TelecommunicationAddressUse]


@strawberry.input
class TelecommunicationAddressInput(URLInput):
    id: strawberry.Maybe[strawberry.ID]
    use: strawberry.Maybe[Optional[bridg.alchemy.TelecommunicationAddressUse]]
