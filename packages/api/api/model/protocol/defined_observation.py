from typing import List

from .defined_activity import DefinedActivity
from .defined_observation_result import DefinedObservationResult


class DefinedObservation(DefinedActivity):
    produced_defined_observation_result: List[DefinedObservationResult]
