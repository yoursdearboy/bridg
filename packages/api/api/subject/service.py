from typing import Iterable, Optional
from uuid import UUID

from bridg import (
    BiologicEntity,
    EntityName,
    Repository,
    StudySiteProtocolVersionRelationship,
    StudySubject,
    StudySubjectProtocolVersionRelationship,
)


class StudySubjectRepository(Repository[StudySubject]):
    _sa = StudySubject

    def find_by(self, space_id: Optional[UUID] = None) -> Iterable[StudySubject]:
        q = self.db.query(StudySubject)
        if space_id:
            q = (
                q.join(StudySubject.assigned_study_subject_protocol_version_relationship)
                .join(StudySubjectProtocolVersionRelationship.assigning_study_site_protocol_version_relationship)
                .filter(StudySiteProtocolVersionRelationship.executed_study_protocol_version_id == space_id)
            )
        return q

    def lookup(self, data: StudySubject) -> Iterable[StudySubject]:
        q = self.db.query(BiologicEntity)
        if (pbe := data.performing_biologic_entity) and (n := next(iter(pbe.name), None)):
            q = q.filter(BiologicEntity.name.any(EntityName.family.ilike(f"%{n.family}%")))
            q = q.limit(10)
            return [StudySubject(performing_biologic_entity=be, performing_biologic_entity_id=be.id) for be in q]
        raise RuntimeError("Unknown performing entity")
