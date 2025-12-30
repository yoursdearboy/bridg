from typing import List

import bridg

from .performed_activity import PerformedActivityBase, PerformedActivityDataBase
from .performed_observation_result import PerformedObservationResult, PerformedObservationResultData


class PerformedObservation(PerformedActivityBase[bridg.PerformedObservation]):
    resulted_performed_observation_result: List[PerformedObservationResult]


class PerformedObservationData(PerformedActivityDataBase[bridg.PerformedObservation]):
    _sa = bridg.PerformedObservation

    resulted_performed_observation_result: List[PerformedObservationResultData]
