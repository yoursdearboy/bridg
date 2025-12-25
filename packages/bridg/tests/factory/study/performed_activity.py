from datetime import timezone

from polyfactory import Ignore, Use

from bridg import PerformedActivity

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory


class PerformedActivityFactory(BaseFactory[PerformedActivity]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    type = Ignore()

    repetition_number = 1
    name_code_modified_text = None

    date_range_low = Use(lambda: BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc))
    date_range_high = Use(lambda: BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc))

    negation_indicator = False
    negation_reason_id = Ignore()
    negation_reason = ConceptDescriptorFactory

    status_code_id = Ignore()
    status_code = ConceptDescriptorFactory

    status_date = Use(lambda: BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc))

    containing_epoch_id = Ignore()
    containing_epoch = Ignore()

    executing_study_protocol_version_id = Ignore()
    executing_study_protocol_version = Ignore()

    instantiated_defined_activity_id = Ignore()
    instantiated_defined_activity = Ignore()

    involved_subject_id = Ignore()
    involved_subject = Ignore()

    reason_code_id = Ignore()
    reason_code = Ignore()

    comment = None

    using_project_id = Ignore()
    using_project = Ignore()

    context_for_study_site_id = Ignore()
    context_for_study_site = Ignore()
