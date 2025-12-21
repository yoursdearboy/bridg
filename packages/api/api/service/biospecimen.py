from typing import List

import bridg
from bridg import BiologicEntity, Repository


class BiospecimenRepository(Repository[bridg.Specimen]):
    _sa = bridg.Specimen

    def lookup(self, data: bridg.Person) -> List[bridg.Specimen]:
        q = self.db.query(BiologicEntity)
        subjects = []
        if (pbe := data) and (n := next(iter(pbe.name), None)):
            q = q.filter(bridg.BiologicEntity.name.any(
                bridg.EntityName.family.ilike(f"%{n.family}%")))
            subjects = [bridg.StudySubject(
                performing_biologic_entity=be, performing_biologic_entity_id=be.id) for be in q]
        specimens = []
        sq = self.db.query(bridg.Specimen)
        if (s := subjects) and (t := next(iter(s), None)):
            sq = sq.join(bridg.PerformedSpecimenCollection).filter(
                bridg.PerformedSpecimenCollection.involved_subject_id == t.id)
            [specimens.append(obj) for obj in sq]
        return specimens
