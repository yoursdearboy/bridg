from datetime import datetime
from typing import Optional

import strawberry

import bridg.alchemy

from ..datatype import ConceptDescriptor
from ..protocol import Epoch


@strawberry.interface
class PerformedActivityInterface:
    id: strawberry.ID
    repetition_number: Optional[int]
    name_code_modified_text: Optional[str]
    # date_range: Optional[IntervalPointInTime]
    negation_indicator: Optional[bool]
    negation_reason: Optional[ConceptDescriptor]
    status_code: Optional[ConceptDescriptor]
    status_date: Optional[datetime]
    containing_epoch: Optional[Epoch]
    # executing_study_protocol_version: Optional[StudyProtocolVersion]
    # instantiated_defined_activity: Optional[DefinedActivity]
    # involved_subject: Optional[StudySubject]


@strawberry.type
class PerformedActivity(PerformedActivityInterface):
    @staticmethod
    def is_type_of(obj, _) -> bool:
        return isinstance(obj, bridg.alchemy.PerformedActivity)
