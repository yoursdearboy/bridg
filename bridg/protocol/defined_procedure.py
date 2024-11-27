from .defined_activity import DefinedActivity


class DefinedProcedure(DefinedActivity):
    __mapper_args__ = {"polymorphic_identity": "procedure"}
