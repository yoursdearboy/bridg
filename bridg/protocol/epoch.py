from typing import Optional

from sqlalchemy import CheckConstraint, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base
from .study_protocol_version import StudyProtocolVersion


class Epoch(Base):
    """
    DEFINITION:
    A discrete, structured plan (that persists over time) for a study to assess the utility, impact, pharmacological, physiological, and/or psychological effects of a particular treatment, procedure, drug, device, biologic, food product, cosmetic, care plan, or subject characteristic.

    EXAMPLE(S):
    ClinicalTrials.gov study NCT01632332 Vaccine Therapy in Treating Patients With Previously Treated Stage II-III HER2-Positive Breast Cancer. The study protocol includes the elements identified in the NOTE(S) section.
    """

    __tablename__ = "epoch"
    __table_args__ = (CheckConstraint("sequence_number >= 0"),)

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[Optional[str]]
    type_code: Mapped[Optional[str]]
    sequence_number: Mapped[Optional[int]]
    description: Mapped[Optional[str]]

    subdivided_study_protocol_version_id: Mapped[int] = mapped_column(ForeignKey("study_protocol_version.id"))
    subdivided_study_protocol_version: Mapped[StudyProtocolVersion] = relationship(back_populates="subdividing_epoch")
    """
    Each Epoch always is a division of one StudyProtocolVersion.
    Each StudyProtocolVersion might be divided into one or more Epoch.
    """
