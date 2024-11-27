from .performed_activity import PerformedActivity


class PerformedObservation(PerformedActivity):
    __mapper_args__ = {"polymorphic_identity": "observation"}
