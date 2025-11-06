from typing import Optional
from uuid import UUID

from api.base_model import BaseModel


class Epoch(BaseModel):
    id: UUID
    name: Optional[str]
    type_code: Optional[str]
    description: Optional[str]
