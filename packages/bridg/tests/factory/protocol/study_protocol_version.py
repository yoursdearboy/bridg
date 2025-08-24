from polyfactory import Ignore

from bridg.protocol import StudyProtocolVersion

from ..base import BaseFactory


class StudyProtocolVersionFactory(BaseFactory[StudyProtocolVersion]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    # acronym

    # versioned_study_protocol
    executing_study_site_protocol_version_relationship = Ignore()
    # executing_study_site
    intended_planned_study_subject = Ignore()
    subdividing_epoch = Ignore()
    used_study_activity = Ignore()
