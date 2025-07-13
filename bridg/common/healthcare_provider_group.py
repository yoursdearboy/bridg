from __future__ import annotations

from typing import TYPE_CHECKING, List
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base

if TYPE_CHECKING:
    from .healthcare_facility import HealthcareFacility
    from .healthcare_provider import HealthcareProvider
    from .healthcare_provider_group_member import HealthcareProviderGroupMember
    from .organization import Organization


class HealthcareProviderGroup(Base):
    """
    DEFINITION:
    A collection of healthcare providers loosely based upon a criterion (i.e., specialty, department, credentials).

    EXAMPLE(S):
    Department of Radiology, Oncology Nurses, Oncologists, Physicians

    OTHER NAME(S):

    NOTE(S):
    """

    __tablename__ = "healthcare_provider_group"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    performing_organization_id: Mapped[UUID] = mapped_column(ForeignKey("organization.id"))
    performing_organization: Mapped[Organization] = relationship(
        back_populates="performed_healthcare_provider_group",
        cascade="all, delete-orphan",
        single_parent=True,
    )
    """
    Each HealthcareProviderGroup always is a function performed by one Organization.
    Each Organization might function as one HealthcareProviderGroup.
    """

    using_healthcare_facility_id: Mapped[UUID] = mapped_column(ForeignKey("healthcare_facility.id"))
    using_healthcare_facility: Mapped[HealthcareFacility] = relationship(
        back_populates="used_healthcare_provider_group"
    )
    """
    Each HealthcareProviderGroup always is used to group staff for one HealthcareFacility.
    Each HealthcareFacility might group staff into one or more HealthcareProviderGroup.
    """

    grouped_healthcare_provider_group_member: Mapped[List[HealthcareProviderGroupMember]] = relationship(
        back_populates="grouping_healthcare_provider_group",
        cascade="all, delete-orphan",
    )
    """
    Each HealthcareProviderGroupMember always belongs to one HealthcareProviderGroup.
    Each HealthcareProviderGroup always contains one or more HealthcareProviderGroupMember.
    """

    grouped_healthcare_provider: AssociationProxy[List[HealthcareProvider]] = association_proxy(
        "grouped_healthcare_provider_group_member",
        "performing_healthcare_provider",
        creator=lambda provider: HealthcareProviderGroupMember(performing_healthcare_provider=provider),
    )

    def __str__(self):
        return str(self.performing_organization)
