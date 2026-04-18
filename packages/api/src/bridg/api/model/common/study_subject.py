from datetime import datetime
from typing import Optional
from uuid import UUID

import bridg.alchemy

from ..base import BaseModel
from ..datatype import ConceptDescriptor
from .organization import Organization
from .person import Person


class StudySubject(BaseModel):
    id: UUID
    status_code: Optional[ConceptDescriptor]
    status_date: Optional[datetime]
    performing_biologic_entity: Optional[Person]
    performing_organization: Optional[Organization]


class StudySubjectData(BaseModel[bridg.alchemy.StudySubject]):
    _sa = bridg.alchemy.StudySubject

    status_code: Optional[ConceptDescriptor]
    status_date: Optional[datetime]
