from datetime import datetime
from typing import Optional

import strawberry

import bridg.alchemy

from ..common import Subject
from ..datatype import ConceptDescriptor, IntervalPointInTime
from ..protocol import Epoch


@strawberry.interface
class PerformedActivityInterface:
    id: strawberry.ID
    repetition_number: Optional[int]
    name_code_modified_text: Optional[str]
    date_range: Optional[IntervalPointInTime]
    negation_indicator: Optional[bool]
    negation_reason: Optional[ConceptDescriptor]
    status_code: Optional[ConceptDescriptor]
    status_date: Optional[datetime]
    containing_epoch: Optional[Epoch]
    # TODO: add these properties
    # executing_study_protocol_version: Optional[StudyProtocolVersion]
    # instantiated_defined_activity: Optional[DefinedActivity]
    involved_subject: Optional[Subject]


@strawberry.type
class PerformedActivity(PerformedActivityInterface):
    @staticmethod
    def is_type_of(obj, _) -> bool:
        return isinstance(obj, bridg.alchemy.PerformedActivity)


@strawberry.input
class PerformedActivityInput:
    id: strawberry.Maybe[strawberry.ID]
    repetition_number: strawberry.Maybe[Optional[int]]
    name_code_modified_text: strawberry.Maybe[Optional[str]]
    date_range: strawberry.Maybe[Optional[IntervalPointInTime]]
    negation_indicator: strawberry.Maybe[Optional[bool]]
    negation_reason: strawberry.Maybe[Optional[ConceptDescriptor]]
    status_code: strawberry.Maybe[Optional[ConceptDescriptor]]
    status_date: strawberry.Maybe[Optional[datetime]]
    containing_epoch_id: strawberry.Maybe[Optional[strawberry.ID]]
    # TODO: add these properties
    # executing_study_protocol_version: Optional[StudyProtocolVersion]
    # instantiated_defined_activity: Optional[DefinedActivity]
    involved_subject_id: strawberry.Maybe[Optional[strawberry.ID]]
