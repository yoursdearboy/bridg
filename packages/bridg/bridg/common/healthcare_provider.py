from __future__ import annotations

from typing import TYPE_CHECKING, List, Optional
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base

if TYPE_CHECKING:
    from .healthcare_facility import HealthcareFacility
    from .healthcare_provider_group import HealthcareProviderGroup
    from .healthcare_provider_group_member import HealthcareProviderGroupMember
    from .organization import Organization
    from .person import Person


class HealthcareProvider(Base):
    """
    DEFINITION:
    A person licensed, certified or otherwise authorized or permitted by law to administer healthcare in the ordinary course of business or practice of a profession.

    EXAMPLE(S):
    Physician, Physician Assistant, Psychologist, Nurse, Physical Therapist

    OTHER NAME(S):

    NOTE(S):
    """

    __tablename__ = "healthcare_provider"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    role: Mapped[Optional[str]]

    performing_person_id: Mapped[UUID] = mapped_column(ForeignKey("person.id"))
    performing_person: Mapped[Person] = relationship(
        back_populates="performed_healthcare_provider",
        cascade="all, delete-orphan",
        single_parent=True,
    )
    """
    Each HealthcareProvider always is a function performed by one Person.
    Each Person might function as one or more HealthcareProvider.
    """

    staffed_healthcare_facility_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("healthcare_facility.id"))
    staffed_healthcare_facility: Mapped[Optional[HealthcareFacility]] = relationship(
        back_populates="staffing_healthcare_provider"
    )
    """
    Each HealthcareProvider might staff one HealthcareFacility.
    Each HealthcareFacility might be staffed by one or more HealthcareProvider.
    """

    employing_organization_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("organization.id"))
    employing_organization: Mapped[Optional[Organization]] = relationship()
    """
    Each HealthcareProvider might belong to a department at one Organization.
    Each Organization might be the department for one or more HealthcareProvider.
    """

    performed_healthcare_provider_group_member: Mapped[List[HealthcareProviderGroupMember]] = relationship(
        back_populates="performing_healthcare_provider", cascade="all, delete-orphan"
    )
    """
    Each HealthcareProviderGroupMember always is a function performed by one HealthcareProvider.
    Each HealthcareProvider might function as one or more HealthcareProviderGroupMember.
    """

    performed_healthcare_provider_group: AssociationProxy[List[HealthcareProviderGroup]] = association_proxy(
        "performed_healthcare_provider_group_member",
        "grouping_healthcare_provider_group",
        creator=lambda group: HealthcareProviderGroupMember(grouping_healthcare_provider_group=group),
    )

    def __str__(self):
        return str(self.performing_person)
