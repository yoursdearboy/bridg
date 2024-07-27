from typing import List, Optional

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from umdb.db import Base


class Organization(Base):
    __tablename__ = "organization"

    id: Mapped[int] = mapped_column(primary_key=True)

    type: Mapped[Optional[str]]
    description: Mapped[Optional[str]]
    actual: Mapped[bool] = mapped_column(default=True)

    names: Mapped[List["OrganizationName"]] = relationship(cascade="all, delete-orphan")

    performed_healthcare_facility: Mapped["HealthcareFacility"] = relationship(
        back_populates="performing_organization"
    )

    employed_healthcare_provider: Mapped[List["HealthcareProvider"]] = relationship(
        back_populates="employing_organization"
    )

    performed_healthcare_provider_group: Mapped[List["HealthcareProviderGroup"]] = (
        relationship(back_populates="performing_organization")
    )


class OrganizationName(Base):
    __tablename__ = "organization_name"

    id: Mapped[int] = mapped_column(primary_key=True)

    value: Mapped[Optional[str]]

    organization_id: Mapped[int] = mapped_column(ForeignKey("organization.id"))
    organization: Mapped["Organization"] = relationship(back_populates="names")
