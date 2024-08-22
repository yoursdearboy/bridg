from typing import Optional

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from umdb.protocol.protocol import StudyProtocolVersion

from ..common.subject import Subject


class PlannedStudySubject(Subject):
    """
    DEFINITION:
    A kind of physical entity which is intended to be the primary unit of operational and/or administrative interest in a study.

    EXAMPLE(S):
    10 Adult males, 20 female 6-month old chickens

    OTHER NAME(S):

    NOTE(S):
    Some studies may specify multiple kinds of subjects, each with their own quantity.
    """

    __tablename__ = "planned_study_subject"
    __mapper_args__ = {"concrete": True}

    id: Mapped[int] = mapped_column(primary_key=True)

    quantity_range: Mapped[Optional[int]]

    planned_for_study_protocol_version_id: Mapped[int] = mapped_column(
        ForeignKey("study_protocol_version.id")
    )
    planned_for_study_protocol_version: Mapped[StudyProtocolVersion] = relationship(
        back_populates="intended_planned_study_subject"
    )
    """
    Each PlannedStudySubject always participates in one StudyProtocolVersion.
    Each StudyProtocolVersion always is participated in by one or more PlannedStudySubject.
    """
