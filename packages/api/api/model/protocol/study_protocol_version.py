from typing import Optional
from uuid import UUID

from pydantic import Field, computed_field

from api.base_model import BaseModel


class StudyProtocolVersion(BaseModel):
    id: UUID
    acronym: Optional[str] = Field(exclude=True)

    @computed_field
    @property
    def label(self) -> str:
        return self.acronym or "Unnamed study protocol version"
