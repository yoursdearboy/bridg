from polyfactory import Ignore, Use

from bridg import PerformedObservation

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory


class PerformedObservationFactory(BaseFactory[PerformedObservation]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    type = Ignore()

    repetition_number = 1
    name_code_modified_text = None
    negation_indicator = False

    status_code = ConceptDescriptorFactory
    status_code_id = Ignore()

    status_date = Use(BaseFactory.__faker__.date_time_this_century)

    containing_epoch = Ignore()
    containing_epoch_id = Ignore()

    executing_study_protocol_version = Ignore()
    executing_study_protocol_version_id = Ignore()

    instantiated_defined_activity = Ignore()
    instantiated_defined_activity_id = Ignore()

    involved_subject = Ignore()
    involved_subject_id = Ignore()

    reason_code_id = Ignore()
    reason_code = Ignore()

    comment = None

    using_project = Ignore()
    using_project_id = Ignore()

    context_for_study_site = Ignore()
    context_for_study_site_id = Ignore()

    resulted_performed_observation_result = Ignore()
