from datetime import datetime
from typing import Optional
from uuid import UUID

import bridg.alchemy

from ..base import BaseModel
from .organization import Organization
from .person import Person


class StudySubject(BaseModel):
    id: UUID
    status: Optional[bridg.alchemy.Status]
    status_date: Optional[datetime]
    performing_biologic_entity: Optional[Person]
    performing_organization: Optional[Organization]


class StudySubjectData(BaseModel[bridg.alchemy.StudySubject]):
    _sa = bridg.alchemy.StudySubject

    status: Optional[bridg.alchemy.Status]
    status_date: Optional[datetime]
