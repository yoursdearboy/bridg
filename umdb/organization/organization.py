from typing import List, Optional

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from umdb.db import Base


class Organization(Base):
    """
    A formalized group of persons or other organizations collected together for a common purpose (such as administrative, legal, political) and the infrastructure to carry out that purpose.

    Attributes:
        id:
        type:
        actual:
        names:
        performed_healthcare_facility:
        employed_healthcare_provider:
        performed_healthcare_provider_group:
    """

    __tablename__ = "organization"

    id: Mapped[int] = mapped_column(primary_key=True)

    type: Mapped[Optional[str]]
    description: Mapped[Optional[str]]
    actual: Mapped[bool] = mapped_column(default=True)

    names: Mapped[List["OrganizationName"]] = relationship(cascade="all, delete-orphan")

    performed_healthcare_facility: Mapped[Optional["HealthcareFacility"]] = (
        relationship(back_populates="performing_organization")
    )
    "Each HealthcareFacility always is a function performed by one Organization."
    "Each Organization might function as one HealthcareFacility."

    employed_healthcare_provider: Mapped[List["HealthcareProvider"]] = relationship(
        back_populates="employing_organization"
    )
    "Each HealthcareProvider might belong to a department at one Organization."
    "Each Organization might be the department for one or more HealthcareProvider."

    performed_healthcare_provider_group: Mapped[Optional["HealthcareProviderGroup"]] = (
        relationship(back_populates="performing_organization")
    )
    "Each HealthcareProviderGroup always is a function performed by one Organization."
    "Each Organization might function as one HealthcareProviderGroup."


class OrganizationName(Base):
    __tablename__ = "organization_name"

    id: Mapped[int] = mapped_column(primary_key=True)

    value: Mapped[Optional[str]]

    organization_id: Mapped[int] = mapped_column(ForeignKey("organization.id"))
    organization: Mapped["Organization"] = relationship(back_populates="names")
