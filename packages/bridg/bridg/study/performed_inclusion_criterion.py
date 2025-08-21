from .performed_eligibility_criterion import PerformedEligibilityCriterion


class PerformedInclusionCriterion(PerformedEligibilityCriterion):
    __mapper_args__ = {"polymorphic_identity": "inclusion_criterion"}
