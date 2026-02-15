from typing import List, Optional
from uuid import UUID

import strawberry

import bridg.alchemy

from .common import Person, Subject
from .context import Context


@strawberry.type
class Query:
    @strawberry.field
    def person(self, id: Optional[UUID] = None, *, info: strawberry.Info[Context]) -> List[Person]:
        session = info.context.session
        query = session.query(bridg.alchemy.Person)
        if id:
            query = query.filter_by(id=id)
        return query.all()  # type: ignore

    @strawberry.field
    def subject(self, id: Optional[UUID] = None, *, info: strawberry.Info[Context]) -> List[Subject]:
        session = info.context.session
        query = session.query(bridg.alchemy.StudySubject)
        if id:
            query = query.filter_by(id=id)
        return query.all()  # type: ignore
