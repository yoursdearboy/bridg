from umdb import (
    BiologicEntity,
    Name,
    Organization,
    OrganizationName,
    PlannedStudySubject,
    StudySubject,
)


def construct_subject(planned: PlannedStudySubject):
    subject = StudySubject()
    if planned.performing_biologic_entity:
        subject.performing_biologic_entity = BiologicEntity(name=[Name()])
    elif planned.performing_organization:
        subject.performing_organization = Organization(name=[OrganizationName()])
    return subject
