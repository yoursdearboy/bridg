from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING, List, Optional
from uuid import UUID

import strawberry

import bridg.alchemy

from ..common import Activity, ActivityInput, Subject
from ..datatype import ConceptDescriptor, IntervalPointInTime
from ..protocol import DefinedActivityInterface, Epoch

if TYPE_CHECKING:
    from ...context import Context


@strawberry.interface
class PerformedActivityInterface(Activity):
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
    instantiated_defined_activity: Optional[DefinedActivityInterface]
    involved_subject: Optional[Subject]


@strawberry.type
class PerformedActivity(PerformedActivityInterface):
    @staticmethod
    def is_type_of(obj, _) -> bool:
        return isinstance(obj, bridg.alchemy.PerformedActivity)


@strawberry.input
class PerformedActivityFilter:
    involved_subject_id: strawberry.Maybe[Optional[strawberry.ID]]


@strawberry.input
class PerformedActivityInput(ActivityInput):
    id: strawberry.Maybe[strawberry.ID]
    type: strawberry.Private[str] = "activity"
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
    instantiated_defined_activity_id: strawberry.Maybe[Optional[strawberry.ID]]
    involved_subject_id: strawberry.Maybe[Optional[strawberry.ID]]


@strawberry.type
class PerformedActivityQuery:
    @strawberry.field(name="PerformedActivity")
    def performed_activity(
        self, id: strawberry.ID, *, info: strawberry.Info[Context]
    ) -> Optional[PerformedActivityInterface]:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.PerformedActivity)
        query = query.filter_by(id=uuid)
        return query.one_or_none()  # type: ignore

    @strawberry.field(name="PerformedActivityList")
    def performed_activity_list(
        self, filter: Optional[PerformedActivityFilter] = None, *, info: strawberry.Info[Context]
    ) -> List[PerformedActivityInterface]:
        converter = info.context.converter
        session = info.context.session
        query = session.query(bridg.alchemy.PerformedActivity)
        if filter and filter.involved_subject_id:
            query = query.filter(
                bridg.alchemy.PerformedActivity.involved_subject_id
                == converter.convert(filter.involved_subject_id.value, UUID)
            )
        return query.all()  # type: ignore


@strawberry.type
class PerformedActivityMutation:
    @strawberry.mutation(name="PerformedActivityDelete")
    def performed_activity_delete(self, id: strawberry.ID, info: strawberry.Info[Context]) -> bool:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.PerformedActivity)
        query = query.filter_by(id=uuid)
        result = query.delete() > 0
        return result
