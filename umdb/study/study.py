from __future__ import annotations

from typing import List, Optional

from sqlalchemy import ForeignKey, Identity
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship, validates

from ..common import HealthcareFacility, Organization, ProjectConduct, StudySubject
from ..db import Base
from ..protocol import StudyProtocolVersion


class StudyConduct(ProjectConduct):
    """
    DEFINITION:
    An ongoing and/or past performance of a formal investigation as specified in a study protocol.

    EXAMPLE(S):

    OTHER NAME(S):

    NOTE(S):
    """

    __mapper_args__ = {"polymorphic_identity": "study"}

    executing_study_site: Mapped[List[StudySite]] = relationship(
        back_populates="executed_study_conduct"
    )
    """
    Each StudySite might execute one StudyConduct.
    Each StudyConduct might be executed at one or more StudySite.
    """


class StudySite(Base):
    """
    DEFINITION:
    A facility in which study activities are conducted.

    EXAMPLE(S):
    The site where the study subject encounter occurs, or the site of the Investigator.

    OTHER NAME(S):

    NOTE(S):
    """

    __tablename__ = "study_site"

    id: Mapped[int] = mapped_column(primary_key=True)

    lead: Mapped[Optional[bool]]

    performing_healthcare_facility_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("healthcare_facility.id")
    )
    performing_healthcare_facility: Mapped[Optional[HealthcareFacility]] = (
        relationship()
    )
    """
    Each StudySite might be a function performed by one HealthcareFacility.
    Each HealthcareFacility might function as one or more StudySite.
    """

    performing_organization_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("organization.id")
    )
    performing_organization: Mapped[Optional[Organization]] = relationship()
    """
    Each StudySite might be a function performed by one Organization.
    Each Organization might function as one or more StudySite.
    """

    executed_study_conduct_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("project_conduct.id")
    )
    executed_study_conduct: Mapped[Optional[StudyConduct]] = relationship(
        back_populates="executing_study_site"
    )
    """
    Each StudySite might execute one StudyConduct.
    Each StudyConduct might be executed at one or more StudySite.
    """

    executed_study_site_protocol_version_relationship: Mapped[
        List["StudySiteProtocolVersionRelationship"]
    ] = relationship(back_populates="executing_study_site")
    """
    Each StudySiteProtocolVersionRelationship always is executed at one StudySite.
    Each StudySite might execute one or more StudySiteProtocolVersionRelationship.
    """

    executing_study_protocol_version: AssociationProxy[List["StudyProtocolVersion"]] = (
        association_proxy(
            "executed_study_site_protocol_version_relationship",
            "executed_study_protocol_version",
            creator=lambda espv: StudySiteProtocolVersionRelationship(
                executed_study_protocol_version=espv
            ),
        )
    )

    @validates("performing_healthcare_facility", "performing_organization")
    def validate_performing_entity(self, key, value):
        performing_entities = dict(
            performing_healthcare_facility=self.performing_healthcare_facility,
            performing_organization=self.performing_organization,
        )
        performing_entities[key] = value
        count = sum(pe is not None for pe in performing_entities.values())
        if count > 1:
            raise ValueError(
                "A StudySite is a function performed by one and only one of the following: HealthcareFacility or Organization (serving as a StudySite but is not a HealthcareFacility)."
            )
        return value

    @property
    def performing_entity(self):
        if self.performing_healthcare_facility:
            return self.performing_healthcare_facility
        if self.performing_organization:
            return self.performing_organization
        raise RuntimeError("A study site must have a project")

    @property
    def executing_project(self):
        if self.executed_study_conduct:
            return self.executed_study_conduct.instantiating_project

        project_version = self.executing_study_protocol_version
        if len(project_version) > 0:
            return project_version[0].versioned_study_protocol.planned_study

        # FIXME: temporary fix to allow creation of study sites in admin
        # raise RuntimeError("A study site must have a project")

    def __str__(self):
        ep = self.executing_project
        ep = ep if ep is not None else "_____"
        return f"{self.performing_entity} in {ep}"


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

    id: Mapped[int] = mapped_column(Identity(), unique=True)

    executing_study_site_id: Mapped[int] = mapped_column(
        ForeignKey("study_site.id"), primary_key=True
    )
    executing_study_site: Mapped[StudySite] = relationship(
        back_populates="executed_study_site_protocol_version_relationship"
    )
    """
    Each StudySiteProtocolVersionRelationship always is executed at one StudySite.
    Each StudySite might execute one or more StudySiteProtocolVersionRelationship.
    """

    executed_study_protocol_version_id: Mapped[int] = mapped_column(
        ForeignKey("study_protocol_version.id"), primary_key=True
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
        back_populates="assigning_study_site_protocol_version_relationship",
        # too much cascades for many-to-many-to-many
        # it's better managed on the other side of relation
        # cascade="all, delete-orphan",
        # so viewonly
        viewonly=True,
    )
    """
    Each StudySubjectProtocolVersionRelationship always is assigned to one StudySiteProtocolVersionRelationship.
    Each StudySiteProtocolVersionRelationship might be the assigned version for one or more StudySubjectProtocolVersionRelationship.
    """

    assigned_study_subject: AssociationProxy[List["StudySubject"]] = association_proxy(
        "assigned_study_subject_protocol_version_relationship",
        "assigning_study_subject",
        creator=lambda ass: StudySubjectProtocolVersionRelationship(
            assigning_study_subject=ass
        ),
    )

    def __str__(self):
        return f"{self.executing_study_site.performing_entity} in {self.executed_study_protocol_version}"


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

    assigning_study_subject_id: Mapped[int] = mapped_column(
        ForeignKey("subject.id"), primary_key=True
    )
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
    assigning_study_site_protocol_version_relationship: Mapped[
        StudySiteProtocolVersionRelationship
    ] = relationship(
        back_populates="assigned_study_subject_protocol_version_relationship",
    )
    """
    Each StudySubjectProtocolVersionRelationship always is assigned to one StudySiteProtocolVersionRelationship.
    Each StudySiteProtocolVersionRelationship might be the assigned version for one or more StudySubjectProtocolVersionRelationship.
    """
