from __future__ import annotations

from typing import TYPE_CHECKING, List
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base

if TYPE_CHECKING:
    from .healthcare_provider import HealthcareProvider
    from .healthcare_provider_group import HealthcareProviderGroup
    from .organization import Organization


class HealthcareFacility(Base):
    """
    DEFINITION:
    An organization that devotes some or all of its resources (people, places, things) to the delivery of healthcare services (including the financial and administrative management of those resources).

    EXAMPLE(S):
    Northwestern Memorial Hospital

    OTHER NAME(S):

    NOTE(S):
    A healthcare facility may be manifest as a single physical location (e.g. building), or, alternatively, as a distributed collection of physical spaces.
    """

    __tablename__ = "healthcare_facility"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    performing_organization_id: Mapped[UUID] = mapped_column(ForeignKey("organization.id"))
    performing_organization: Mapped[Organization] = relationship(
        back_populates="performed_healthcare_facility",
        cascade="all, delete-orphan",
        single_parent=True,
    )
    """
    Each HealthcareFacility always is a function performed by one Organization.
    Each Organization might function as one HealthcareFacility.
    """

    staffing_healthcare_provider: Mapped[List[HealthcareProvider]] = relationship(
        back_populates="staffed_healthcare_facility"
    )
    """
    Each HealthcareProvider might staff one HealthcareFacility.
    Each HealthcareFacility might be staffed by one or more HealthcareProvider.
    """

    used_healthcare_provider_group: Mapped[List[HealthcareProviderGroup]] = relationship(
        back_populates="using_healthcare_facility", cascade="all, delete-orphan"
    )
    """
    Each HealthcareProviderGroup always is used to group staff for one HealthcareFacility.
    Each HealthcareFacility might group staff into one or more HealthcareProviderGroup.
    """

    def __str__(self):
        return str(self.performing_organization)
