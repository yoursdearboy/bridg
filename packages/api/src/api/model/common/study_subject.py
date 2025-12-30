from datetime import datetime
from typing import Optional
from uuid import UUID

import bridg

from ..base import BaseModel
from .organization import Organization
from .person import Person


class StudySubject(BaseModel):
    id: UUID
    status: Optional[bridg.Status]
    status_date: Optional[datetime]
    performing_biologic_entity: Optional[Person]
    performing_organization: Optional[Organization]


class StudySubjectData(BaseModel[bridg.StudySubject]):
    _sa = bridg.StudySubject

    status: Optional[bridg.Status]
    status_date: Optional[datetime]
