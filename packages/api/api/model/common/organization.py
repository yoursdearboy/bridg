from typing import Optional
from uuid import UUID

from ..base import BaseModel
from .organization_name import OrganizationName


class Organization(BaseModel):
    id: UUID
    description: Optional[str]
    primary_name: Optional[OrganizationName]
