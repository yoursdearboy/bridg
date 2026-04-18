from datetime import timezone

from polyfactory import Ignore, Use

from bridg.alchemy.common import StudySubject

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory


class StudySubjectFactory(BaseFactory[StudySubject]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    type = Ignore()
    performing_biologic_entity = None
    performing_biologic_entity_id = None
    performing_organization = None
    performing_organization_id = None
    performing_specimen = None
    performing_specimen_id = None

    involving_performed_activity = Ignore()
    involving_scheduled_activity = Ignore()

    status_code_id = Ignore()
    status_code = ConceptDescriptorFactory
    status_date = Use(lambda: BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc))

    assigned_study_subject_protocol_version_relationship = Ignore()
    assigned_study_site_protocol_version_relationship = Ignore()
