from polyfactory import Ignore

from bridg.study import StudySite

from ..base import BaseFactory


class StudySiteFactory(BaseFactory[StudySite]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    # lead

    performing_healthcare_facility = Ignore()
    performing_organization = Ignore()
    executed_study_conduct = Ignore()
    executed_study_site_protocol_version_relationship = Ignore()
    # executing_study_protocol_version
