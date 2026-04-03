from __future__ import annotations

from typing import TYPE_CHECKING, List

import strawberry

import bridg.alchemy

from .performed_activity import PerformedActivityInput, PerformedActivityInterface
from .performed_observation_result import PerformedObservationResult, PerformedObservationResultInput

if TYPE_CHECKING:
    from ...context import Context


@strawberry.type
class PerformedObservation(PerformedActivityInterface):
    resulted_performed_observation_result: List[PerformedObservationResult]

    @staticmethod
    def is_type_of(obj, _) -> bool:
        return isinstance(obj, bridg.alchemy.PerformedObservation)


@strawberry.input
class PerformedObservationInput(PerformedActivityInput):
    type: strawberry.Private[str] = "observation"
    resulted_performed_observation_result: List[PerformedObservationResultInput]


@strawberry.type
class PerformedObservationMutation:
    @strawberry.mutation(name="PerformedObservationCreate")
    def performed_observation_create(
        self, input: PerformedObservationInput, info: strawberry.Info[Context]
    ) -> PerformedObservation:
        session = info.context.session
        converter = info.context.converter
        activity = converter.convert(input, bridg.alchemy.PerformedObservation)
        activity = session.merge(activity)
        return activity  # type: ignore
