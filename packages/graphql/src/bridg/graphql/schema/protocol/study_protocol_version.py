from typing import Optional

import strawberry


@strawberry.type
class StudyProtocolVersion:
    id: strawberry.ID
    acronym: Optional[str]
