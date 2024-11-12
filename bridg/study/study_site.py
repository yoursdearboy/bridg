from __future__ import annotations

from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import ForeignKey
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship, validates

from ..db import Base
from .study_site_protocol_version_relationship import StudySiteProtocolVersionRelationship

if TYPE_CHECKING:
    from ..common import HealthcareFacility, Organization
    from ..protocol import StudyProtocolVersion
    from .study_conduct import StudyConduct


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

    performing_healthcare_facility_id: Mapped[Optional[int]] = mapped_column(ForeignKey("healthcare_facility.id"))
    performing_healthcare_facility: Mapped[Optional[HealthcareFacility]] = relationship()
    """
    Each StudySite might be a function performed by one HealthcareFacility.
    Each HealthcareFacility might function as one or more StudySite.
    """

    performing_organization_id: Mapped[Optional[int]] = mapped_column(ForeignKey("organization.id"))
    performing_organization: Mapped[Optional[Organization]] = relationship()
    """
    Each StudySite might be a function performed by one Organization.
    Each Organization might function as one or more StudySite.
    """

    executed_study_conduct_id: Mapped[Optional[int]] = mapped_column(ForeignKey("project_conduct.id"))
    executed_study_conduct: Mapped[Optional[StudyConduct]] = relationship(back_populates="executing_study_site")
    """
    Each StudySite might execute one StudyConduct.
    Each StudyConduct might be executed at one or more StudySite.
    """

    executed_study_site_protocol_version_relationship: Mapped[List[StudySiteProtocolVersionRelationship]] = (
        relationship(back_populates="executing_study_site")
    )
    """
    Each StudySiteProtocolVersionRelationship always is executed at one StudySite.
    Each StudySite might execute one or more StudySiteProtocolVersionRelationship.
    """

    executing_study_protocol_version: AssociationProxy[List["StudyProtocolVersion"]] = association_proxy(
        "executed_study_site_protocol_version_relationship",
        "executed_study_protocol_version",
        creator=lambda espv: StudySiteProtocolVersionRelationship(executed_study_protocol_version=espv),
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
