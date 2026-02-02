from typing import Optional

import strawberry


@strawberry.type
class InstanceIdentifier:
    root: str
    extension: Optional[str]
