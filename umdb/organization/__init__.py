from typing import List, Optional

from sqlalchemy import ForeignKey
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship

from umdb.db import Base
from umdb.person import Person


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


class HealthcareFacility(Base):
    __tablename__ = "healthcare_facilitiy"

    id: Mapped[int] = mapped_column(primary_key=True)

    performing_organization_id: Mapped[int] = mapped_column(
        ForeignKey("organization.id")
    )
    performing_organization: Mapped[Organization] = relationship(
        back_populates="performed_healthcare_facility"
    )

    staffing_healthcare_provider: Mapped[List["HealthcareProvider"]] = relationship(
        back_populates="staffed_healthcare_facility"
    )

    used_healthcare_provider_group: Mapped[List["HealthcareProviderGroup"]] = (
        relationship(back_populates="using_healthcare_facility")
    )


class HealthcareProvider(Base):
    __tablename__ = "healthcare_provider"

    id: Mapped[int] = mapped_column(primary_key=True)

    role: Mapped[Optional[str]]

    performing_person_id: Mapped[int] = mapped_column(ForeignKey("person.id"))
    performing_person: Mapped[Person] = relationship()

    staffed_healthcare_facility_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("healthcare_facilitiy.id")
    )
    staffed_healthcare_facility: Mapped[Optional[HealthcareFacility]] = relationship(
        back_populates="staffing_healthcare_provider"
    )

    employing_organization_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("organization.id")
    )
    employing_organization: Mapped[Optional[Organization]] = relationship(
        back_populates="employed_healthcare_provider"
    )

    performed_healthcare_provider_group_member: Mapped[
        List["HealthcareProviderGroupMember"]
    ] = relationship(back_populates="performing_healthcare_provider")

    performed_healthcare_provider_group: AssociationProxy[
        List["HealthcareProviderGroup"]
    ] = association_proxy(
        "performed_healthcare_provider_group_member",
        "grouping_healthcare_provider_group",
        creator=lambda group: HealthcareProviderGroupMember(
            grouping_healthcare_provider_group=group
        ),
    )


class HealthcareProviderGroup(Base):
    __tablename__ = "healthcare_provider_group"

    id: Mapped[int] = mapped_column(primary_key=True)

    performing_organization_id: Mapped[int] = mapped_column(
        ForeignKey("organization.id")
    )
    performing_organization: Mapped[Organization] = relationship(
        back_populates="performed_healthcare_provider_group"
    )

    using_healthcare_facility_id: Mapped[int] = mapped_column(
        ForeignKey("healthcare_facilitiy.id")
    )
    using_healthcare_facility: Mapped[HealthcareFacility] = relationship(
        back_populates="used_healthcare_provider_group"
    )

    grouped_healthcare_provider_group_member: Mapped[
        List["HealthcareProviderGroupMember"]
    ] = relationship(back_populates="grouping_healthcare_provider_group")

    grouped_healthcare_provider: AssociationProxy[List["HealthcareProvider"]] = (
        association_proxy(
            "grouped_healthcare_provider_group_member",
            "performing_healthcare_provider",
            creator=lambda provider: HealthcareProviderGroupMember(
                performing_healthcare_provider=provider
            ),
        )
    )


class HealthcareProviderGroupMember(Base):
    __tablename__ = "healthcare_provider_group_member"

    id: Mapped[int] = mapped_column(primary_key=True)

    grouping_healthcare_provider_group_id: Mapped[int] = mapped_column(
        ForeignKey("healthcare_provider_group.id")
    )
    grouping_healthcare_provider_group: Mapped[HealthcareProviderGroup] = relationship(
        back_populates="grouped_healthcare_provider_group_member"
    )

    performing_healthcare_provider_id: Mapped[int] = mapped_column(
        ForeignKey("healthcare_provider.id")
    )
    performing_healthcare_provider: Mapped[HealthcareProvider] = relationship(
        back_populates="performed_healthcare_provider_group_member"
    )
