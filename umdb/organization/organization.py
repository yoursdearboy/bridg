from typing import List, Optional

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from umdb.db import Base


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

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[List["OrganizationName"]] = relationship(
        back_populates="organization", cascade="all, delete-orphan"
    )
    type: Mapped[Optional[str]]
    description: Mapped[Optional[str]]
    actual: Mapped[bool] = mapped_column(default=True)

    performed_healthcare_facility: Mapped[Optional["HealthcareFacility"]] = (
        relationship(back_populates="performing_organization")
    )
    """
    Each HealthcareFacility always is a function performed by one Organization.
    Each Organization might function as one HealthcareFacility.
    """

    performed_healthcare_provider_group: Mapped[Optional["HealthcareProviderGroup"]] = (
        relationship(back_populates="performing_organization")
    )
    """
    Each HealthcareProviderGroup always is a function performed by one Organization.
    Each Organization might function as one HealthcareProviderGroup.
    """

    employed_healthcare_provider: Mapped[List["HealthcareProvider"]] = relationship(
        back_populates="employing_organization"
    )
    """
    Each HealthcareProvider might belong to a department at one Organization.
    Each Organization might be the department for one or more HealthcareProvider.
    """

    @property
    def primary_name(self):
        if len(self.name) == 0:
            return
        return self.name[0]

    def __str__(self):
        if not self.primary_name:
            return "Unnamed"
        return str(self.primary_name)


class OrganizationName(Base):
    __tablename__ = "organization_name"

    id: Mapped[int] = mapped_column(primary_key=True)

    value: Mapped[Optional[str]]

    organization_id: Mapped[int] = mapped_column(ForeignKey("organization.id"))
    organization: Mapped["Organization"] = relationship(back_populates="name")

    def __str__(self):
        if not self.value:
            return "Unnamed"
        return self.value
