from polyfactory import Ignore, Require

from bridg.alchemy.common import StudySubject

from ..base import BaseFactory


class StudySubjectFactory(BaseFactory[StudySubject]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    performing_biologic_entity = Require()
    performing_organization = Require()
    assigned_study_subject_protocol_version_relationship = Ignore()
    assigned_study_site_protocol_version_relationship = Ignore()
    involving_performed_activity = Ignore()
    involving_scheduled_activity = Ignore()
