from typing import List

import bridg

from .performed_activity import PerformedActivity
from .performed_observation_result import PerformedObservationResult


class PerformedObservation(PerformedActivity[bridg.PerformedObservation]):
    _sa = bridg.PerformedObservation

    resulted_performed_observation_result: List[PerformedObservationResult]
