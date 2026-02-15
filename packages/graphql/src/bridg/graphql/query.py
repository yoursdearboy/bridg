from typing import List, Optional
from uuid import UUID

import strawberry

from bridg import alchemy

from .common import Person, Subject
from .context import Context


@strawberry.type
class Query:
    @strawberry.field
    def person(self, id: Optional[UUID] = None, *, info: strawberry.Info[Context]) -> List[Person]:
        session = info.context.session
        query = session.query(alchemy.Person)
        if id:
            query = query.filter_by(id=id)
        return query.all()  # type: ignore

    @strawberry.field
    def subject(self, id: Optional[UUID] = None, *, info: strawberry.Info[Context]) -> List[Subject]:
        session = info.context.session
        query = session.query(alchemy.StudySubject)
        if id:
            query = query.filter_by(id=id)
        return query.all()  # type: ignore
