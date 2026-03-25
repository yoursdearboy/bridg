from polyfactory import Ignore

from bridg.alchemy.study import StudySite

from ..base import BaseFactory
from ..common import OrganizationFactory


class StudySiteFactory(BaseFactory[StudySite]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    lead = False

    performing_healthcare_facility = None
    performing_organization = OrganizationFactory
    executed_study_conduct = Ignore()
    executed_study_site_protocol_version_relationship = Ignore()
    executing_study_protocol_version = Ignore()
