from .performed_observation import PerformedObservation


class PerformedEligibilityCriterion(PerformedObservation):
    __mapper_args__ = {"polymorphic_identity": "eligibility_criterion"}
