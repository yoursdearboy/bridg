from typing import Optional

import strawberry

from ..common import HealthcareFacility, Organization


@strawberry.type
class StudySite:
    id: strawberry.ID
    lead: Optional[bool]
    performing_healthcare_facility: Optional[HealthcareFacility]
    performing_organization: Optional[Organization]
    # executed_study_conduct: Optional[StudyConduct]
    # executed_study_site_protocol_version_relationship: List[StudySiteProtocolVersionRelationship]
    # executing_study_protocol_version: List[StudyProtocolVersion]
