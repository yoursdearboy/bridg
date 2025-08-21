from .defined_eligibility_criterion import DefinedEligibilityCriterion


class DefinedExclusionCriterion(DefinedEligibilityCriterion):
    __mapper_args__ = {"polymorphic_identity": "exclusion_criterion"}
