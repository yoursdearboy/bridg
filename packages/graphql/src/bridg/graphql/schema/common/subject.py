from __future__ import annotations

from typing import TYPE_CHECKING, Annotated, List, Optional
from uuid import UUID

import strawberry

import bridg.alchemy

from .biologic_entity import BiologicEntity, BiologicEntityInput
from .organization import Organization

if TYPE_CHECKING:
    from ...context import Context
    from ..study import PerformedActivity


@strawberry.type
class Subject:
    id: strawberry.ID
    performing_biologic_entity: Optional[BiologicEntity]
    performing_organization: Optional[Organization]
    involving_performed_activity: List[Annotated[PerformedActivity, strawberry.lazy("..study")]]


@strawberry.input
class SubjectInput:
    id: strawberry.Maybe[strawberry.ID]
    performing_biologic_entity_id: strawberry.Maybe[strawberry.ID]
    performing_biologic_entity: strawberry.Maybe[BiologicEntityInput]


@strawberry.type
class SubjectQuery:
    @strawberry.field(name="Subject")
    def subject(self, id: strawberry.ID, *, info: strawberry.Info[Context]) -> Optional[Subject]:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.Subject)
        query = query.filter_by(id=uuid)
        return query.one_or_none()  # type: ignore

    @strawberry.field(name="SubjectList")
    def subject_list(self, *, info: strawberry.Info[Context]) -> List[Subject]:
        session = info.context.session
        query = session.query(bridg.alchemy.Subject)
        return query.all()  # type: ignore


@strawberry.type
class SubjectMutation:
    @strawberry.mutation(name="SubjectCreate")
    def subject_create(self, input: SubjectInput, info: strawberry.Info[Context]) -> Subject:
        session = info.context.session
        converter = info.context.converter
        subject = converter.convert(input, bridg.alchemy.Subject)
        subject = session.merge(subject)
        return subject  # type: ignore
