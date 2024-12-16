from bridg import StudyProtocolVersion

from ..db import db
from ..views import ContextMixin


def _get_study_protocol_version(id: int):
    return db.session.query(StudyProtocolVersion).filter_by(id=id).one()


def _get_planned_study_subject(version: StudyProtocolVersion):
    subjects = version.intended_planned_study_subject
    if len(subjects) > 0:
        return subjects[0]
    raise ValueError("No planned study subjects")


class SpaceMixin(ContextMixin):
    def setup(self, space_id: int, **kwargs):
        self.study_protocol_version = _get_study_protocol_version(space_id)
        self.planned_study_subject = _get_planned_study_subject(self.study_protocol_version)
        super().setup(space_id=space_id, **kwargs)

    def get_context(self):
        ctx = super().get_context()
        ctx["study_protocol_version"] = self.study_protocol_version
        ctx["planned_study_subject"] = self.planned_study_subject
        return ctx
