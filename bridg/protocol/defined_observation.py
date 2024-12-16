from .defined_activity import DefinedActivity


class DefinedObservation(DefinedActivity):
    __mapper_args__ = {"polymorphic_identity": "observation"}
