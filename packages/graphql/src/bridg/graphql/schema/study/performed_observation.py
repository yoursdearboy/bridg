from __future__ import annotations

from typing import List

import strawberry

import bridg.alchemy

from .performed_activity import PerformedActivityInterface
from .performed_observation_result import PerformedObservationResult


@strawberry.type
class PerformedObservation(PerformedActivityInterface):
    resulted_performed_observation_result: List[PerformedObservationResult]

    @staticmethod
    def is_type_of(obj, _) -> bool:
        return isinstance(obj, bridg.alchemy.PerformedObservation)
