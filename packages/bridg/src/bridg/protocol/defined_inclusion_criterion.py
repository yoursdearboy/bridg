from .defined_eligibility_criterion import DefinedEligibilityCriterion


class DefinedInclusionCriterion(DefinedEligibilityCriterion):
    __mapper_args__ = {"polymorphic_identity": "inclusion_criterion"}
