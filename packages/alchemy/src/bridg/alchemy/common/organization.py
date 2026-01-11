from __future__ import annotations

from typing import TYPE_CHECKING, List, Optional
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..datatype import OrganizationName
from ..db import Base

if TYPE_CHECKING:
    from .healthcare_facility import HealthcareFacility
    from .healthcare_provider import HealthcareProvider
    from .healthcare_provider_group import HealthcareProviderGroup


class Organization(Base):
    """
    DEFINITION:
    A formalized group of persons or other organizations collected together for a common purpose (such as administrative, legal, political) and the infrastructure to carry out that purpose.

    EXAMPLE(S):
    US National Cancer Institute (NCI); CDISC; HL7, ACME Corporation

    OTHER NAME(S):

    NOTE(S):

    Attributes:
        id:
        name:
        type:
        actual:
        performed_healthcare_facility:
        employed_healthcare_provider:
        performed_healthcare_provider_group:
    """

    __tablename__ = "organization"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    name: Mapped[List[OrganizationOrganizationName]] = relationship(
        back_populates="organization", cascade="all, delete-orphan"
    )
    type: Mapped[Optional[str]]
    description: Mapped[Optional[str]]
    actual: Mapped[bool] = mapped_column(default=True)

    performed_healthcare_facility: Mapped[Optional[HealthcareFacility]] = relationship(
        back_populates="performing_organization"
    )
    """
    Each HealthcareFacility always is a function performed by one Organization.
    Each Organization might function as one HealthcareFacility.
    """

    performed_healthcare_provider_group: Mapped[Optional[HealthcareProviderGroup]] = relationship(
        back_populates="performing_organization"
    )
    """
    Each HealthcareProviderGroup always is a function performed by one Organization.
    Each Organization might function as one HealthcareProviderGroup.
    """

    employed_healthcare_provider: Mapped[List[HealthcareProvider]] = relationship(
        back_populates="employing_organization"
    )
    """
    Each HealthcareProvider might belong to a department at one Organization.
    Each Organization might be the department for one or more HealthcareProvider.
    """


class OrganizationOrganizationName(OrganizationName):
    __tablename__ = "organization_name"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    organization_id: Mapped[UUID] = mapped_column(ForeignKey("organization.id"))
    organization: Mapped[Organization] = relationship(back_populates="name")
