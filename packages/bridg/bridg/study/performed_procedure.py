from .performed_activity import PerformedActivity


class PerformedProcedure(PerformedActivity):
    __mapper_args__ = {"polymorphic_identity": "procedure"}
