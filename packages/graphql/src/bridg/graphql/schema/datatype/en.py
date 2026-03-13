from typing import Optional

import strawberry


@strawberry.type
class EntityName:
    id: strawberry.ID
    use: Optional[str]
    family: Optional[str]
    given: Optional[str]
    middle: Optional[str]
    patronymic: Optional[str]
    prefix: Optional[str]
    suffix: Optional[str]


@strawberry.input
class EntityNameInput:
    id: strawberry.Maybe[strawberry.ID]
    use: strawberry.Maybe[Optional[str]]
    family: strawberry.Maybe[Optional[str]]
    given: strawberry.Maybe[Optional[str]]
    middle: strawberry.Maybe[Optional[str]]
    patronymic: strawberry.Maybe[Optional[str]]
    prefix: strawberry.Maybe[Optional[str]]
    suffix: strawberry.Maybe[Optional[str]]
