from uuid import UUID

from ..base import BaseModel
from .defined_activity import DefinedActivity


class StudyActivity(BaseModel):
    id: UUID
    used_defined_activity: DefinedActivity
