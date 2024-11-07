from .. import (
    BiologicEntity,
    EntityName,
    Organization,
    OrganizationName,
    PlannedStudySubject,
    StudySubject,
)


def construct_subject(planned: PlannedStudySubject):
    subject = StudySubject()
    if planned.performing_biologic_entity:
        subject.performing_biologic_entity = BiologicEntity(name=[EntityName()])
    elif planned.performing_organization:
        subject.performing_organization = Organization(name=[OrganizationName()])
    return subject
