from datetime import datetime
from typing import Optional
from uuid import UUID

import bridg

from ..base import BaseModel
from ..datatypes import ConceptDescriptor
from ..observation_result import ObservationResult


class PerformedObservationResult(ObservationResult, BaseModel[bridg.PerformedObservationResult]):
    id: UUID
    type_code: Optional[ConceptDescriptor]
    value_null_flavor_reason: Optional[str]
    baseline_indicator: Optional[bool]
    derived_indicator: Optional[bool]
    created_date: Optional[datetime]
    reported_date: Optional[datetime]
    comment: Optional[str]


class PerformedObservationResultData(ObservationResult, BaseModel[bridg.PerformedObservationResult]):
    _sa = bridg.PerformedObservationResult

    id: Optional[UUID] = None
    type_code: Optional[ConceptDescriptor]
    value_null_flavor_reason: Optional[str]
    baseline_indicator: Optional[bool]
    derived_indicator: Optional[bool]
    created_date: Optional[datetime]
    reported_date: Optional[datetime]
    comment: Optional[str]
