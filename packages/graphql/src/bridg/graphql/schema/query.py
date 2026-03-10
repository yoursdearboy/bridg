from __future__ import annotations

from typing import TYPE_CHECKING, List, Optional
from uuid import UUID

import strawberry

import bridg.alchemy

from .common import Person, PersonFilter, Subject
from .study import PerformedActivity

if TYPE_CHECKING:
    from ..context import Context


@strawberry.type
class Query:
    @strawberry.field(name="Person")
    def person(self, id: strawberry.ID, *, info: strawberry.Info[Context]) -> Optional[Person]:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.Person)
        query = query.filter_by(id=uuid)
        return query.one_or_none()  # type: ignore

    @strawberry.field(name="PersonList")
    def person_list(self, filter: Optional[PersonFilter] = None, *, info: strawberry.Info[Context]) -> List[Person]:
        session = info.context.session
        query = session.query(bridg.alchemy.Person)
        # FIXME: move to a service
        if filter:
            if filter.name and filter.name.family:
                query = query.filter(
                    bridg.alchemy.BiologicEntity.name.any(
                        bridg.alchemy.BiologicEntityName.family.ilike(f"%{filter.name.family.value}%")
                    )
                )
            # FIXME: check identifier code? or not?
            if filter.identifier:
                root = filter.identifier.identifier.root
                extension = filter.identifier.identifier.extension
                q = (bridg.alchemy.BiologicEntityIdentifier.identifier_root == root) & (  # pyright: ignore[reportAttributeAccessIssue]
                    bridg.alchemy.BiologicEntityIdentifier.identifier_extension == extension  # pyright: ignore[reportAttributeAccessIssue]
                )
                query = query.filter(bridg.alchemy.BiologicEntity.identifier.any(q))
        return query.all()  # type: ignore

    @strawberry.field(name="Subject")
    def subject(self, id: strawberry.ID, *, info: strawberry.Info[Context]) -> Optional[Subject]:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.StudySubject)
        query = query.filter_by(id=uuid)
        return query.one_or_none()  # type: ignore

    @strawberry.field(name="SubjectList")
    def subject_list(self, *, info: strawberry.Info[Context]) -> List[Subject]:
        session = info.context.session
        query = session.query(bridg.alchemy.StudySubject)
        return query.all()  # type: ignore

    @strawberry.field(name="PerformedActivity")
    def performed_activity(self, id: strawberry.ID, *, info: strawberry.Info[Context]) -> Optional[PerformedActivity]:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.PerformedActivity)
        query = query.filter_by(id=uuid)
        return query.one_or_none()  # type: ignore

    @strawberry.field(name="PerformedActivityList")
    def performed_activity_list(self, *, info: strawberry.Info[Context]) -> List[PerformedActivity]:
        session = info.context.session
        query = session.query(bridg.alchemy.PerformedActivity)
        return query.all()  # type: ignore
