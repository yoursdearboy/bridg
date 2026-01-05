from __future__ import annotations

from typing import TYPE_CHECKING, List, Optional
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship, validates

from ..db import Base
from .study_site_protocol_version_relationship import (
    StudySiteProtocolVersionRelationship,
)

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

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    lead: Mapped[Optional[bool]]

    performing_healthcare_facility_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("healthcare_facility.id"))
    performing_healthcare_facility: Mapped[Optional[HealthcareFacility]] = relationship()
    """
    Each StudySite might be a function performed by one HealthcareFacility.
    Each HealthcareFacility might function as one or more StudySite.
    """

    performing_organization_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("organization.id"))
    performing_organization: Mapped[Optional[Organization]] = relationship()
    """
    Each StudySite might be a function performed by one Organization.
    Each Organization might function as one or more StudySite.
    """

    executed_study_conduct_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("project_conduct.id"))
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

    executing_study_protocol_version: AssociationProxy[List[StudyProtocolVersion]] = association_proxy(
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
