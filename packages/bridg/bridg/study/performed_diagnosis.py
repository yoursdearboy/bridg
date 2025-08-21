from .performed_observation_result import PerformedObservationResult


class PerformedDiagnosis(PerformedObservationResult):
    __mapper_args__ = {"polymorphic_identity": "diagnosis"}
