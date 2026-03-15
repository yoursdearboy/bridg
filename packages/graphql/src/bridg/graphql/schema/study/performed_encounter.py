from __future__ import annotations

from typing import TYPE_CHECKING, Optional
from uuid import UUID

import strawberry

import bridg.alchemy

from ..common import Place
from ..datatype import ConceptDescriptor
from .performed_activity import PerformedActivityInput, PerformedActivityInterface

if TYPE_CHECKING:
    from ...context import Context


@strawberry.type
class PerformedEncounter(PerformedActivityInterface):
    classification_code: Optional[ConceptDescriptor]
    departing_to_place: Optional[Place]
    arriving_from_place: Optional[Place]

    @staticmethod
    def is_type_of(obj, _) -> bool:
        return isinstance(obj, bridg.alchemy.PerformedEncounter)


@strawberry.input
class PerformedEncounterInput(PerformedActivityInput):
    classification_code: strawberry.Maybe[Optional[ConceptDescriptor]]
    departing_to_place_id: strawberry.Maybe[Optional[strawberry.ID]]
    arriving_from_place_id: strawberry.Maybe[Optional[strawberry.ID]]


@strawberry.type
class PerformedEncounterQuery:
    @strawberry.field(name="PerformedEncounter")
    def performed_encounter(self, id: strawberry.ID, *, info: strawberry.Info[Context]) -> Optional[PerformedEncounter]:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.PerformedEncounter)
        query = query.filter_by(id=uuid)
        return query.one_or_none()  # type: ignore


@strawberry.type
class PerformedEncounterMutation:
    @strawberry.mutation(name="PerformedEncounterCreate")
    def performed_encounter_create(
        self, input: PerformedEncounterInput, info: strawberry.Info[Context]
    ) -> PerformedEncounter:
        session = info.context.session
        converter = info.context.converter
        activity = converter.convert(input, bridg.alchemy.PerformedEncounter)
        activity = session.merge(activity)
        return activity  # type: ignore
