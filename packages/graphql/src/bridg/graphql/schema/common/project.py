from typing import Optional

import strawberry


@strawberry.type
class Project:
    id: strawberry.ID
    kind: str

    name: Optional[str]
    type: Optional[str]
    description: Optional[str]

    # instantiated_project_execution
