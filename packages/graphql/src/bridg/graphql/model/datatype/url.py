from typing import Optional

import strawberry

import bridg.alchemy


@strawberry.type
class URL:
    scheme: Optional[bridg.alchemy.URLScheme]
    address: Optional[str]


@strawberry.input
class URLInput:
    scheme: strawberry.Maybe[Optional[bridg.alchemy.URLScheme]]
    address: strawberry.Maybe[Optional[str]]
