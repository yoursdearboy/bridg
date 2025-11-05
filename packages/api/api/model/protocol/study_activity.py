from uuid import UUID

from api.base_model import BaseModel

from .defined_activity import DefinedActivity


class StudyActivity(BaseModel):
    id: UUID
    used_defined_activity: DefinedActivity
