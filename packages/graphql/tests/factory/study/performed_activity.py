from datetime import timezone

from polyfactory import Ignore, Use
from strawberry import Some

from bridg.graphql.schema import PerformedActivityInput

from ..base import BaseFactory
from ..common import ActivityInputFactory
from ..datatype import ConceptDescriptorFactory, IntervalPointInTimeFactory
from ..maybe import make_some


class PerformedActivityInputBaseFactory[T: PerformedActivityInput](ActivityInputFactory[T]):
    __is_base_factory__ = True

    id = None
    type = Ignore()
    repetition_number = Some(1)
    name_code_modified_text = None
    date_range = Use(make_some(IntervalPointInTimeFactory.build))
    negation_indicator = Some(False)
    negation_reason = None
    status_code = Use(make_some(ConceptDescriptorFactory.build))
    status_date = Use(
        make_some(lambda: BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc))
    )
    containing_epoch_id = None
    locating_place_id = None
    # TODO: add these properties
    # executing_study_protocol_version: Optional[StudyProtocolVersion]
    instantiated_defined_activity_id = Ignore()
    involved_subject_id = Ignore()


class PerformedActivityInputFactory(PerformedActivityInputBaseFactory[PerformedActivityInput]):
    pass
