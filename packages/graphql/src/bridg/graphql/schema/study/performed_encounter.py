from typing import Optional

import strawberry

import bridg.alchemy

from ..common import Place
from ..datatype import ConceptDescriptor
from .performed_activity import PerformedActivityInput, PerformedActivityInterface


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
