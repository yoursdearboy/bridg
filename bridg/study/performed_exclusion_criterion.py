from .performed_eligibility_criterion import PerformedEligibilityCriterion


class PerformedExclusionCriterion(PerformedEligibilityCriterion):
    __mapper_args__ = {"polymorphic_identity": "exclusion_criterion"}
