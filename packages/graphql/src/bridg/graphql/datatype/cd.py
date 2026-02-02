from typing import Optional

import strawberry


@strawberry.type
class ConceptDescriptor:
    id: strawberry.ID

    code: str
    code_system: str
    display_name: Optional[str]
