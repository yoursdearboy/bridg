from .performed_activity import PerformedActivity


class PerformedAdministrativeActivity(PerformedActivity):
    __mapper_args__ = {"polymorphic_identity": "administrative_activity"}
