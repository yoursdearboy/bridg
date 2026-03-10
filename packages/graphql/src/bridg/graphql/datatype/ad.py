from typing import Optional

import strawberry

import bridg.alchemy


@strawberry.type
class PostalAddress:
    id: strawberry.ID
    use: Optional[bridg.alchemy.PostalAddressUse]
    street: Optional[str]
    building: Optional[str]
    country: Optional[str]
    municipality: Optional[str]
    state: Optional[str]
    zip: Optional[str]


@strawberry.input
class PostalAddressInput:
    use: strawberry.Maybe[Optional[bridg.alchemy.PostalAddressUse]]
    street: strawberry.Maybe[Optional[str]]
    building: strawberry.Maybe[Optional[str]]
    country: strawberry.Maybe[Optional[str]]
    municipality: strawberry.Maybe[Optional[str]]
    state: strawberry.Maybe[Optional[str]]
    zip: strawberry.Maybe[Optional[str]]
