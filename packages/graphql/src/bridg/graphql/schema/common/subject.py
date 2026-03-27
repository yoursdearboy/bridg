from __future__ import annotations

from typing import TYPE_CHECKING, Annotated, List, Optional
from uuid import UUID

import strawberry

import bridg.alchemy

from .biologic_entity import BiologicEntity, BiologicEntityInput
from .organization import Organization

if TYPE_CHECKING:
    from ...context import Context
    from ..biospecimen import Specimen, SpecimenInput
    from ..study import PerformedActivityInterface


@strawberry.interface
class SubjectInterface:
    id: strawberry.ID
    performing_biologic_entity: Optional[BiologicEntity]
    performing_organization: Optional[Organization]
    performing_specimen: Optional[Annotated[Specimen, strawberry.lazy("..biospecimen")]]
    involving_performed_activity: List[Annotated[PerformedActivityInterface, strawberry.lazy("..study")]]


@strawberry.type
class Subject(SubjectInterface):
    @staticmethod
    def is_type_of(obj, _) -> bool:
        return isinstance(obj, bridg.alchemy.Subject)


@strawberry.input
class SubjectInput:
    id: strawberry.Maybe[strawberry.ID]
    performing_biologic_entity_id: strawberry.Maybe[strawberry.ID]
    performing_biologic_entity: strawberry.Maybe[BiologicEntityInput]
    performing_specimen_id: strawberry.Maybe[strawberry.ID]
    performing_specimen: strawberry.Maybe[Annotated[SpecimenInput, strawberry.lazy("..biospecimen")]]

    def __post_init__(self):
        performing = [
            self.performing_biologic_entity,
            self.performing_biologic_entity_id,
            self.performing_specimen,
            self.performing_specimen_id,
        ]
        count = sum(pe is not None for pe in performing)
        if count > 1:
            raise ValueError(
                "Use one of: "
                "performing_biologic_entity_id,"
                "performing_biologic_entity,"
                "performing_specimen_id,"
                "performing_specimen"
            )


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
