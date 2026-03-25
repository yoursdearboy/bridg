import strawberry

from ..protocol import StudyProtocolVersion
from .study_site import StudySite


@strawberry.type
class StudySiteProtocolVersionRelationship:
    executing_study_site: StudySite
    executed_study_protocol_version: StudyProtocolVersion


@strawberry.input
class StudySiteProtocolVersionRelationshipInput:
    executing_study_site_id: strawberry.ID
    executed_study_protocol_version_id: strawberry.ID
