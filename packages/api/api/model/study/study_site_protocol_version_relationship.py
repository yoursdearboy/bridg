from uuid import UUID

from api.base_model import BaseModel

from ..protocol import StudyProtocolVersion
from .study_site import StudySite


class StudySiteProtocolVersionRelationship(BaseModel):
    id: UUID
    executing_study_site: StudySite
    executed_study_protocol_version: StudyProtocolVersion
