from typing import Optional

import strawberry


@strawberry.type
class EntityName:
    use: Optional[str]
    family: Optional[str]
    given: Optional[str]
    middle: Optional[str]
    patronymic: Optional[str]
    prefix: Optional[str]
    suffix: Optional[str]


@strawberry.input
class EntityNameInput:
    use: strawberry.Maybe[Optional[str]]
    family: strawberry.Maybe[Optional[str]]
    given: strawberry.Maybe[Optional[str]]
    middle: strawberry.Maybe[Optional[str]]
    patronymic: strawberry.Maybe[Optional[str]]
    prefix: strawberry.Maybe[Optional[str]]
    suffix: strawberry.Maybe[Optional[str]]
