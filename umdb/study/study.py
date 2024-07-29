from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import ForeignKey
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship

from umdb.db import Base
from umdb.organization.healthcare import HealthcareFacility
from umdb.organization.organization import Organization
from umdb.study.project import ProjectConduct, ResearchProject

if TYPE_CHECKING:
    from umdb.study.protocol import (
        StudyProtocol,
        StudyProtocolVersion,
        StudySiteProtocolVersionRelationship,
    )


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

    planning_study_protocol: Mapped[Optional["StudyProtocol"]] = relationship(
        back_populates="planned_study", cascade="all, delete-orphan"
    )
    """
    Each StudyProtocol always is the plan for one Study.
    Each Study might have as plan one StudyProtocol.
    """


class StudyConduct(ProjectConduct):
    """
    DEFINITION:
    An ongoing and/or past performance of a formal investigation as specified in a study protocol.

    EXAMPLE(S):

    OTHER NAME(S):

    NOTE(S):
    """

    __mapper_args__ = {"polymorphic_identity": "study"}

    executing_study_site: Mapped[List["StudySite"]] = relationship(
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
        return str(self.performing_entity)
