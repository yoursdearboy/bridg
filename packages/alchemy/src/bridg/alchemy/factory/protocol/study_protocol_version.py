from polyfactory import Ignore, Use

from bridg.alchemy.protocol import StudyProtocolVersion

from ..base import BaseFactory
from ..study import StudySiteFactory


class StudyProtocolVersionFactory(BaseFactory[StudyProtocolVersion]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    acronym = Use(lambda: BaseFactory.__faker__.lexify("?????"))

    versioned_study_protocol = Ignore()
    executing_study_site_protocol_version_relationship = Ignore()
    executing_study_site = Use(lambda: StudySiteFactory.batch(3))
    intended_planned_study_subject = Ignore()
    subdividing_epoch = Ignore()
    used_study_activity = Ignore()
