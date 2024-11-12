from __future__ import annotations

from typing import TYPE_CHECKING, List

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base

if TYPE_CHECKING:
    from ..common import Study
    from .study_protocol_version import StudyProtocolVersion


class StudyProtocol(Base):
    """
    DEFINITION:
    A discrete, structured plan (that persists over time) for a study to assess the utility, impact, pharmacological, physiological, and/or psychological effects of a particular treatment, procedure, drug, device, biologic, food product, cosmetic, care plan, or subject characteristic.

    EXAMPLE(S):
    ClinicalTrials.gov study NCT01632332 Vaccine Therapy in Treating Patients With Previously Treated Stage II-III HER2-Positive Breast Cancer. The study protocol includes the elements identified in the NOTE(S) section.
    """

    __tablename__ = "study_protocol"

    id: Mapped[int] = mapped_column(primary_key=True)

    planned_study_id: Mapped[int] = mapped_column(ForeignKey("project.id"))
    planned_study: Mapped[Study] = relationship(back_populates="planning_study_protocol")
    """
    Each StudyProtocol always is the plan for one Study.
    Each Study might have as plan one StudyProtocol.
    """

    versioning_study_protocol_version: Mapped[List[StudyProtocolVersion]] = relationship(
        back_populates="versioned_study_protocol", cascade="all, delete-orphan"
    )
    """
    Each StudyProtocolVersion always is a version of one StudyProtocol.
    Each StudyProtocol always has as a version one or more StudyProtocolVersion.
    """

    def __str__(self):
        return str(self.planned_study)
