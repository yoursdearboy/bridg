from .defined_observation_result import DefinedObservationResult


class DefinedDiagnosis(DefinedObservationResult):
    __mapper_args__ = {"polymorphic_identity": "diagnosis"}
