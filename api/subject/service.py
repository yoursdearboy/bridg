from typing import List, Optional
from uuid import UUID

from sqlalchemy.orm import Session

from bridg import (
    BiologicEntity,
    EntityName,
    StudySiteProtocolVersionRelationship,
    StudySubject,
    StudySubjectProtocolVersionRelationship,
)


class StudySubjectRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list(self, space_id: Optional[UUID] = None) -> List[StudySubject]:
        q = self.db.query(StudySubject)
        if space_id:
            q = (
                q.join(StudySubject.assigned_study_subject_protocol_version_relationship)
                .join(StudySubjectProtocolVersionRelationship.assigning_study_site_protocol_version_relationship)
                .filter(StudySiteProtocolVersionRelationship.executed_study_protocol_version_id == space_id)
            )
        return q.all()

    def get(self, id: UUID) -> Optional[StudySubject]:
        return self.db.query(StudySubject).filter_by(id=id).one_or_none()

    def create(self, data: StudySubject) -> StudySubject:
        self.db.add(data)
        self.db.commit()
        return data

    def lookup(self, data: StudySubject) -> List[StudySubject]:
        q = self.db.query(BiologicEntity)
        if (pbe := data.performing_biologic_entity) and (n := next(iter(pbe.name), None)):
            q = q.filter(BiologicEntity.name.any(EntityName.family.ilike(f"%{n.family}%")))
            q = q.limit(10)
            return [StudySubject(performing_biologic_entity=be) for be in q]
        raise RuntimeError("Unknown performing entity")
