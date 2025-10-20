from typing import List
from uuid import UUID

from fastapi import APIRouter

from api.subject import StudySubject, StudySubjectRepositoryDep

router = APIRouter(prefix="/subjects", tags=["subjects"])

class PersonStudySubject(StudySubject):
    _sa: StudySubject

    performing_biologic_entity: UUID

@router.get("")
def index(person_id: UUID, repo: StudySubjectRepositoryDep) -> List[StudySubject]:
    objs = repo.find_by(performing_biologic_entity_id=person_id)
    return [StudySubject.model_validate(obj) for obj in objs]
