from uuid import UUID

from ..base import BaseModel
from ..protocol import StudyProtocolVersion
from .study_site import StudySite


class StudySiteProtocolVersionRelationship(BaseModel):
    id: UUID
    executing_study_site: StudySite
    executed_study_protocol_version: StudyProtocolVersion
