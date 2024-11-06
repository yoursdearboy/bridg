from __future__ import annotations

from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import ForeignKey
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..common import Study
from ..db import Base

if TYPE_CHECKING:
    from ..study import StudySite, StudySiteProtocolVersionRelationship
    from .subject import PlannedStudySubject


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
    planned_study: Mapped[Study] = relationship(
        back_populates="planning_study_protocol"
    )
    """
    Each StudyProtocol always is the plan for one Study.
    Each Study might have as plan one StudyProtocol.
    """

    versioning_study_protocol_version: Mapped[List[StudyProtocolVersion]] = (
        relationship(
            back_populates="versioned_study_protocol", cascade="all, delete-orphan"
        )
    )
    """
    Each StudyProtocolVersion always is a version of one StudyProtocol.
    Each StudyProtocol always has as a version one or more StudyProtocolVersion.
    """

    def __str__(self):
        return str(self.planned_study)


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

    id: Mapped[int] = mapped_column(primary_key=True)

    acronym: Mapped[Optional[str]]

    versioned_study_protocol_id: Mapped[int] = mapped_column(
        ForeignKey("study_protocol.id")
    )
    versioned_study_protocol: Mapped[StudyProtocol] = relationship(
        back_populates="versioning_study_protocol_version"
    )
    """
    Each StudyProtocolVersion always is a version of one StudyProtocol.
    Each StudyProtocol always has as a version one or more StudyProtocolVersion.
    """

    executing_study_site_protocol_version_relationship: Mapped[
        List["StudySiteProtocolVersionRelationship"]
    ] = relationship(
        back_populates="executed_study_protocol_version", cascade="all, delete-orphan"
    )
    """
    Each StudySiteProtocolVersionRelationship always executes one StudyProtocolVersion.
    Each StudyProtocolVersion might be executed at one or more StudySiteProtocolVersionRelationship.
    """

    @staticmethod
    def __executing_study_site_creator(ess):
        from ..study import StudySiteProtocolVersionRelationship

        return StudySiteProtocolVersionRelationship(executing_study_site=ess)

    executing_study_site: AssociationProxy[List["StudySite"]] = association_proxy(
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

    def __str__(self):
        if self.acronym:
            return self.acronym
        return "{self.versioned_study_protocol} version"
