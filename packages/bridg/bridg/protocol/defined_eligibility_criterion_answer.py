from typing import Optional

from sqlalchemy.orm import Mapped

from .defined_observation_result import DefinedObservationResult


class DefinedEligibilityCriterionAnswer(DefinedObservationResult):
    __mapper_args__ = {"polymorphic_identity": "eligibility_criterion_answer"}

    required_indicator: Mapped[Optional[bool]]
