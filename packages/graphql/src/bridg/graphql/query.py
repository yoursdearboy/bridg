from typing import List, Optional
from uuid import UUID

import strawberry

import bridg.alchemy

from .common import Person, PersonLookup, Subject
from .context import Context


@strawberry.type
class Query:
    @strawberry.field
    def person(
        self,
        id: Optional[UUID] = None,
        lookup: Optional[PersonLookup] = None,
        *,
        info: strawberry.Info[Context],
    ) -> List[Person]:
        session = info.context.session
        query = session.query(bridg.alchemy.Person)
        if id:
            query = query.filter_by(id=id)
        # FIXME: move to a service
        if lookup:
            if lookup.name and lookup.name.family:
                query = query.filter(
                    bridg.alchemy.BiologicEntity.name.any(
                        bridg.alchemy.BiologicEntityName.family.ilike(f"%{lookup.name.family.value}%")
                    )
                )
            if lookup.identifier:
                root = lookup.identifier.identifier.root
                extension = lookup.identifier.identifier.extension
                q = (bridg.alchemy.BiologicEntityIdentifier.identifier_root == root) & (  # pyright: ignore[reportAttributeAccessIssue]
                    bridg.alchemy.BiologicEntityIdentifier.identifier_extension == extension  # pyright: ignore[reportAttributeAccessIssue]
                )
                query = query.filter(bridg.alchemy.BiologicEntity.identifier.any(q))
                lookup.identifier.identifier.root
        return query.all()  # type: ignore

    @strawberry.field
    def subject(self, id: Optional[UUID] = None, *, info: strawberry.Info[Context]) -> List[Subject]:
        session = info.context.session
        query = session.query(bridg.alchemy.StudySubject)
        if id:
            query = query.filter_by(id=id)
        return query.all()  # type: ignore
