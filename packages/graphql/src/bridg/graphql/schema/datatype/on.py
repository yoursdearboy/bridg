from typing import Optional

import strawberry


@strawberry.type
class OrganizationName:
    use: Optional[str]
    value: Optional[str]
    prefix: Optional[str]
    suffix: Optional[str]
