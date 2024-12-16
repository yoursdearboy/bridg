from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Identity
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base

if TYPE_CHECKING:
    from ..common import StudySubject
    from ..study import StudySiteProtocolVersionRelationship


class StudySubjectProtocolVersionRelationship(Base):
    """
    DEFINITION:
    Specifies the link between a study subject and a version of the study protocol at a site.

    EXAMPLE(S):

    OTHER NAME(S):

    NOTE(S):
    """

    __tablename__ = "study_subject_protocol_version_relationship"

    id: Mapped[int] = mapped_column(Identity(), unique=True)

    assigning_study_subject_id: Mapped[int] = mapped_column(ForeignKey("study_subject.id"), primary_key=True)
    assigning_study_subject: Mapped[StudySubject] = relationship(
        back_populates="assigned_study_subject_protocol_version_relationship",
    )
    """
    Each StudySubjectProtocolVersionRelationship always is the assigned version for one StudySubject.
    Each StudySubject might be assigned to one or more StudySubjectProtocolVersionRelationship.
    """

    assigning_study_site_protocol_version_relationship_id: Mapped[int] = mapped_column(
        ForeignKey("study_site_protocol_version_relationship.id"), primary_key=True
    )
    assigning_study_site_protocol_version_relationship: Mapped[StudySiteProtocolVersionRelationship] = relationship(
        back_populates="assigned_study_subject_protocol_version_relationship",
    )
    """
    Each StudySubjectProtocolVersionRelationship always is assigned to one StudySiteProtocolVersionRelationship.
    Each StudySiteProtocolVersionRelationship might be the assigned version for one or more StudySubjectProtocolVersionRelationship.
    """
