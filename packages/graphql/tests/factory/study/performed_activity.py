from datetime import timezone

from polyfactory import Ignore, Use

from bridg.graphql.schema import PerformedActivityInput

from ..base import BaseFactory
from ..common import ActivityInputFactory
from ..datatype import IntervalPointInTimeFactory
from ..maybe import make_some


class PerformedActivityInputFactory[T: PerformedActivityInput](ActivityInputFactory[T]):
    __is_base_factory__ = True

    id = None
    type = Ignore()
    repetition_number = 1
    name_code_modified_text = None
    date_range = IntervalPointInTimeFactory
    negation_indicator = False
    negation_reason = None
    # status_code
    status_date = Use(
        make_some(lambda: BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc))
    )
    containing_epoch_id = None
    # TODO: add these properties
    # executing_study_protocol_version: Optional[StudyProtocolVersion]
    # instantiated_defined_activity: Optional[DefinedActivity]
    involved_subject_id = Ignore()
