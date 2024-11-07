from .. import (
    EntityName,
    Organization,
    OrganizationName,
    PlannedStudySubject,
    StudySubject,
)


def construct_subject(planned: PlannedStudySubject):
    subject = StudySubject()
    if planned.performing_biologic_entity:
        klass = planned.performing_biologic_entity.__class__
        subject.performing_biologic_entity = klass(name=[EntityName()])
    elif planned.performing_organization:
        subject.performing_organization = Organization(name=[OrganizationName()])
    return subject
