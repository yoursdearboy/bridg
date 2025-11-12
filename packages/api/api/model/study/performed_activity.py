from datetime import datetime
from typing import Optional, TypeVar
from uuid import UUID

import bridg

from ..base import BaseModel
from ..datatypes import ConceptDescriptor
from ..protocol import DefinedActivity, Epoch
from .study_site import StudySite

T = TypeVar("T", bound=bridg.PerformedActivity)


class PerformedActivity(BaseModel[T]):
    id: UUID
    reason_code: Optional[ConceptDescriptor]
    status_code: Optional[ConceptDescriptor]
    status_date: Optional[datetime]
    context_for_study_site: Optional[StudySite]
    containing_epoch: Optional[Epoch]
    instantiated_defined_activity: Optional[DefinedActivity]
