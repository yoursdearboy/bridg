import strawberry

from .common import Person
from .strawchemy import strawchemy


@strawberry.type
class Query:
    person: list[Person] = strawchemy.field()
