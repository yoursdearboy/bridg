from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import ForeignKey
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship

from umdb.db import Base
from umdb.study.study import Study, StudySite

if TYPE_CHECKING:
    from umdb.study.subject import StudySubject, StudySubjectProtocolVersionRelationship


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

    versioning_study_protocol_version: Mapped[List["StudyProtocolVersion"]] = (
        relationship(
            back_populates="versioned_study_protocol", cascade="all, delete-orphan"
        )
    )
    """
    Each StudyProtocolVersion always is a version of one StudyProtocol.
    Each StudyProtocol always has as a version one or more StudyProtocolVersion.
    """


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
    ] = relationship(back_populates="executed_study_protocol_version")
    """
    Each StudySiteProtocolVersionRelationship always executes one StudyProtocolVersion.
    Each StudyProtocolVersion might be executed at one or more StudySiteProtocolVersionRelationship.
    """

    executing_study_site: AssociationProxy[List["StudySite"]] = association_proxy(
        "executing_study_site_protocol_version_relationship",
        "executing_study_site",
        creator=lambda ess: StudySiteProtocolVersionRelationship(
            executing_study_site=ess
        ),
    )


class StudySiteProtocolVersionRelationship(Base):
    """
    DEFINITION:
    Specifies the link between a study site and a version of the study protocol used or available for use at that site.

    EXAMPLE(S):

    OTHER NAME(S):

    NOTE(S):
    Even if a study site's IRB has not reviewed the study protocol version, if there is a new version for the study protocol, then there is the potential for a relationship between the site and the version.  The dateRange is specified only if the version is approved for this site by the IRB and activated at the site.  Retroactive approval means that the dateRange does not have to be on or after the IRB approval date.
    """

    __tablename__ = "study_site_protocol_version_relationship"

    id: Mapped[int] = mapped_column(primary_key=True)

    executing_study_site_id: Mapped[int] = mapped_column(ForeignKey("study_site.id"))
    executing_study_site: Mapped[StudySite] = relationship(
        back_populates="executed_study_site_protocol_version_relationship"
    )
    """
    Each StudySiteProtocolVersionRelationship always is executed at one StudySite.
    Each StudySite might execute one or more StudySiteProtocolVersionRelationship.
    """

    executed_study_protocol_version_id: Mapped[int] = mapped_column(
        ForeignKey("study_protocol_version.id")
    )
    executed_study_protocol_version: Mapped[StudyProtocolVersion] = relationship(
        back_populates="executing_study_site_protocol_version_relationship"
    )
    """
    Each StudySiteProtocolVersionRelationship always executes one StudyProtocolVersion.
    Each StudyProtocolVersion might be executed at one or more StudySiteProtocolVersionRelationship.
    """

    assigned_study_subject_protocol_version_relationship: Mapped[
        List["StudySubjectProtocolVersionRelationship"]
    ] = relationship(
        back_populates="assigning_study_site_protocol_version_relationship"
    )
    """
    Each StudySubjectProtocolVersionRelationship always is assigned to one StudySiteProtocolVersionRelationship.
    Each StudySiteProtocolVersionRelationship might be the assigned version for one or more StudySubjectProtocolVersionRelationship.
    """

    assigned_study_subject: AssociationProxy[List["StudySubject"]] = association_proxy(
        "assigned_study_subject_protocol_version_relationship",
        "assigning_study_subject",
        creator=lambda ass: StudySiteProtocolVersionRelationship(
            assigning_study_subject=ass
        ),
    )
