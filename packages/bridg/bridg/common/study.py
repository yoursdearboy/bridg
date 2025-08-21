from __future__ import annotations

from typing import TYPE_CHECKING, Optional

from sqlalchemy.orm import Mapped, relationship

from .research_project import ResearchProject

if TYPE_CHECKING:
    from ..protocol import StudyProtocol


class Study(ResearchProject):
    """
    DEFINITION:
    A research project whose objectives are to test or confirm hypotheses concerning the utility, impact, pharmacological, physiological, and/or psychological effects of a particular treatment, procedure, drug, device, biologic, food product, cosmetic, care plan, or subject characteristic.

    EXAMPLE(S):
    A vaccine therapy study looking at treating patients with previously treated stage II-III HER2-positive breast cancer

    OTHER NAME(S):

    NOTE(S):
    """

    __mapper_args__ = {"polymorphic_identity": "study"}

    planning_study_protocol: Mapped[Optional[StudyProtocol]] = relationship(
        back_populates="planned_study", cascade="all, delete-orphan"
    )
    """
    Each StudyProtocol always is the plan for one Study.
    Each Study might have as plan one StudyProtocol.
    """
