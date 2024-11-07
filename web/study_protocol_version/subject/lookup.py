from sqlalchemy.orm import Session, scoped_session

from bridg import BiologicEntity, Name, Organization, OrganizationName, StudySubject


def _lookup_bio(obj: BiologicEntity, session: scoped_session | Session):
    q = session.query(BiologicEntity)
    if name := obj.name[0]:
        q = q.filter(BiologicEntity.name.any(Name.family.ilike(f"%{name.family}%")))
    return q


def _lookup_org(obj: Organization, session: scoped_session | Session):
    q = session.query(Organization)
    if name := obj.name[0]:
        q = q.filter(
            Organization.name.any(OrganizationName.value.ilike(f"%{name.value}%"))
        )
    return q


def lookup(subject: StudySubject, session: scoped_session | Session, limit=5):
    if bio := subject.performing_biologic_entity:
        q = _lookup_bio(bio, session)
    if org := subject.performing_organization:
        q = _lookup_org(org, session)

    q = q.limit(limit)

    def _wrap(obj):
        s = StudySubject()
        if subject.performing_biologic_entity:
            s.performing_biologic_entity = obj
        if subject.performing_organization:
            s.performing_organization = obj
        return s

    return map(_wrap, q.all())
