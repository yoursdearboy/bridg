from typing import List

import strawberry

from bridg import alchemy

from .common import Person
from .context import Context


@strawberry.type
class Query:
    @strawberry.field
    def person(self, info: strawberry.Info[Context]) -> List[Person]:
        session = info.context.session
        return session.query(alchemy.Person).all()  # type: ignore
