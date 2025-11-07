from typing import List

from .performed_activity import PerformedActivity
from .performed_observation_result import PerformedObservationResult


class PerformedObservation(PerformedActivity):
    resulted_performed_observation_result: List[PerformedObservationResult]
