from __future__ import annotations

from typing import List

import strawberry

import bridg.alchemy

from .defined_activity import DefinedActivityInterface
from .defined_observation_result import DefinedObservationResult


@strawberry.type
class DefinedObservation(DefinedActivityInterface):
    produced_defined_observation_result: List[DefinedObservationResult]

    @staticmethod
    def is_type_of(obj, _) -> bool:
        return isinstance(obj, bridg.alchemy.DefinedObservation)
