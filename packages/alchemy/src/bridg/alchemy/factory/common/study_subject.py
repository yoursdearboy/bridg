from polyfactory import Ignore

from bridg.alchemy.common import StudySubject

from ..base import BaseFactory


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
    assigned_study_subject_protocol_version_relationship = Ignore()
    assigned_study_site_protocol_version_relationship = Ignore()
    involving_performed_activity = Ignore()
    involving_scheduled_activity = Ignore()
