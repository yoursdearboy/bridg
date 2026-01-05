from __future__ import annotations

from typing import TYPE_CHECKING, List, Optional
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base

if TYPE_CHECKING:
    from ..study import StudySite, StudySiteProtocolVersionRelationship
    from .epoch import Epoch
    from .planned_study_subject import PlannedStudySubject
    from .study_activity import StudyActivity
    from .study_protocol import StudyProtocol


class StudyProtocolVersion(Base):
    """
    DEFINITION:
    A variant or snapshot of the study protocol at a particular point in time.

    EXAMPLE(S):

    OTHER NAME(S):

    NOTE(S):
    A change in virtually any aspect of a study protocol can trigger the creation of a new study protocol version.  The kinds of changes that can trigger creation of a new study protocol version include (but are not limited to) changes to the design, statistical considerations, activities to test a particular hypothesis or answer a particular question that is the basis of the study, characteristics, specifications, objective(s), background, pre-study/study/post-study portions of the plan (including the design, methodology, statistical considerations, organization), supporting documents such as informed consent documents, case report forms (CRFs), regulatory and approval documentation, correlative studies, etc.
    """

    __tablename__ = "study_protocol_version"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    acronym: Mapped[Optional[str]]

    versioned_study_protocol_id: Mapped[UUID] = mapped_column(ForeignKey("study_protocol.id"))
    versioned_study_protocol: Mapped[StudyProtocol] = relationship(back_populates="versioning_study_protocol_version")
    """
    Each StudyProtocolVersion always is a version of one StudyProtocol.
    Each StudyProtocol always has as a version one or more StudyProtocolVersion.
    """

    executing_study_site_protocol_version_relationship: Mapped[List[StudySiteProtocolVersionRelationship]] = (
        relationship(back_populates="executed_study_protocol_version", cascade="all, delete-orphan")
    )
    """
    Each StudySiteProtocolVersionRelationship always executes one StudyProtocolVersion.
    Each StudyProtocolVersion might be executed at one or more StudySiteProtocolVersionRelationship.
    """

    @staticmethod
    def __executing_study_site_creator(ess):
        from ..study import StudySiteProtocolVersionRelationship

        return StudySiteProtocolVersionRelationship(executing_study_site=ess)

    executing_study_site: AssociationProxy[List[StudySite]] = association_proxy(
        "executing_study_site_protocol_version_relationship",
        "executing_study_site",
        creator=__executing_study_site_creator,
    )

    intended_planned_study_subject: Mapped[List[PlannedStudySubject]] = relationship(
        back_populates="planned_for_study_protocol_version",
        cascade="all, delete-orphan",
    )
    """
    Each PlannedStudySubject always participates in one StudyProtocolVersion.
    Each StudyProtocolVersion always is participated in by one or more PlannedStudySubject.
    """

    subdividing_epoch: Mapped[List[Epoch]] = relationship(
        back_populates="subdivided_study_protocol_version", cascade="all, delete-orphan"
    )
    """
    Each Epoch always is a division of one StudyProtocolVersion.
    Each StudyProtocolVersion might be divided into one or more Epoch.
    """

    used_study_activity: Mapped[List[StudyActivity]] = relationship(
        back_populates="using_study_protocol_version", cascade="all, delete-orphan"
    )
    """
    Each StudyActivity might be used by one StudyProtocolVersion.
    Each StudyProtocolVersion might use one or more StudyActivity.
    """
