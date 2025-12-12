from datetime import datetime
from typing import Optional, TypeVar
from uuid import UUID

import bridg

from ..base import BaseModel
from ..datatypes import ConceptDescriptor
from ..protocol import DefinedActivity, Epoch
from .study_site import StudySite

T = TypeVar("T", bound=bridg.PerformedActivity)


class PerformedActivityBase(BaseModel[T]):
    id: UUID
    comment: Optional[str]
    negation_indicator: Optional[bool]
    negation_reason: Optional[ConceptDescriptor]
    reason_code: Optional[ConceptDescriptor]
    status_code: Optional[ConceptDescriptor]
    status_date: Optional[datetime]
    context_for_study_site: Optional[StudySite]
    containing_epoch: Optional[Epoch]
    instantiated_defined_activity: Optional[DefinedActivity]


class PerformedActivity(PerformedActivityBase[bridg.PerformedActivity]):
    pass


class PerformedActivityDataBase(BaseModel[T]):
    comment: Optional[str]
    negation_indicator: Optional[bool]
    negation_reason: Optional[ConceptDescriptor]
    reason_code: Optional[ConceptDescriptor]
    status_code: Optional[ConceptDescriptor]
    status_date: Optional[datetime]
    context_for_study_site_id: Optional[UUID]
    containing_epoch_id: Optional[UUID]
    instantiated_defined_activity_id: Optional[UUID]


class PerformedActivityData(PerformedActivityDataBase[bridg.PerformedActivity]):
    _sa = bridg.PerformedActivity
