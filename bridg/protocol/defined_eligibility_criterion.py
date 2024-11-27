from .defined_observation import DefinedObservation


class DefinedEligibilityCriterion(DefinedObservation):
    __mapper_args__ = {"polymorphic_identity": "eligibility_criterion"}
