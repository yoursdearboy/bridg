from typing import List

import bridg.alchemy

from .performed_activity import PerformedActivityBase, PerformedActivityDataBase
from .performed_observation_result import PerformedObservationResult, PerformedObservationResultData


class PerformedObservation(PerformedActivityBase[bridg.alchemy.PerformedObservation]):
    resulted_performed_observation_result: List[PerformedObservationResult]


class PerformedObservationData(PerformedActivityDataBase[bridg.alchemy.PerformedObservation]):
    _sa = bridg.alchemy.PerformedObservation

    resulted_performed_observation_result: List[PerformedObservationResultData]
