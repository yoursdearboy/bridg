from typing import List, Optional

from sqlalchemy import ForeignKey
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship

from umdb.db import Base
from umdb.person import Person

from .organization import Organization


class HealthcareFacility(Base):
    __tablename__ = "healthcare_facilitiy"

    id: Mapped[int] = mapped_column(primary_key=True)

    performing_organization_id: Mapped[int] = mapped_column(
        ForeignKey("organization.id")
    )
    performing_organization: Mapped[Organization] = relationship(
        back_populates="performed_healthcare_facility"
    )
    "Each HealthcareFacility always is a function performed by one Organization."
    "Each Organization might function as one HealthcareFacility."

    staffing_healthcare_provider: Mapped[List["HealthcareProvider"]] = relationship(
        back_populates="staffed_healthcare_facility"
    )
    "Each HealthcareProvider might staff one HealthcareFacility."
    "Each HealthcareFacility might be staffed by one or more HealthcareProvider."

    used_healthcare_provider_group: Mapped[List["HealthcareProviderGroup"]] = (
        relationship(back_populates="using_healthcare_facility")
    )
    "Each HealthcareProviderGroup always is used to group staff for one HealthcareFacility."
    "Each HealthcareFacility might group staff into one or more HealthcareProviderGroup."


class HealthcareProvider(Base):
    __tablename__ = "healthcare_provider"

    id: Mapped[int] = mapped_column(primary_key=True)

    role: Mapped[Optional[str]]

    performing_person_id: Mapped[int] = mapped_column(ForeignKey("person.id"))
    performing_person: Mapped[Person] = relationship()
    "Each HealthcareProvider always is a function performed by one Person."
    "Each Person might function as one or more HealthcareProvider."

    staffed_healthcare_facility_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("healthcare_facilitiy.id")
    )
    staffed_healthcare_facility: Mapped[Optional[HealthcareFacility]] = relationship(
        back_populates="staffing_healthcare_provider"
    )
    "Each HealthcareProvider might staff one HealthcareFacility."
    "Each HealthcareFacility might be staffed by one or more HealthcareProvider."

    employing_organization_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("organization.id")
    )
    employing_organization: Mapped[Optional[Organization]] = relationship(
        back_populates="employed_healthcare_provider"
    )
    "Each HealthcareProvider might belong to a department at one Organization."
    "Each Organization might be the department for one or more HealthcareProvider."

    performed_healthcare_provider_group_member: Mapped[
        List["HealthcareProviderGroupMember"]
    ] = relationship(back_populates="performing_healthcare_provider")
    "Each HealthcareProviderGroupMember always is a function performed by one HealthcareProvider."
    "Each HealthcareProvider might function as one or more HealthcareProviderGroupMember."

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
    "Each HealthcareProviderGroup always is a function performed by one Organization."
    "Each Organization might function as one HealthcareProviderGroup."

    using_healthcare_facility_id: Mapped[int] = mapped_column(
        ForeignKey("healthcare_facilitiy.id")
    )
    using_healthcare_facility: Mapped[HealthcareFacility] = relationship(
        back_populates="used_healthcare_provider_group"
    )
    "Each HealthcareProviderGroup always is used to group staff for one HealthcareFacility."
    "Each HealthcareFacility might group staff into one or more HealthcareProviderGroup."

    grouped_healthcare_provider_group_member: Mapped[
        List["HealthcareProviderGroupMember"]
    ] = relationship(back_populates="grouping_healthcare_provider_group")
    "Each HealthcareProviderGroupMember always belongs to one HealthcareProviderGroup."
    "Each HealthcareProviderGroup always contains one or more HealthcareProviderGroupMember."

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
    "Each HealthcareProviderGroupMember always belongs to one HealthcareProviderGroup."
    "Each HealthcareProviderGroup always contains one or more HealthcareProviderGroupMember."

    performing_healthcare_provider_id: Mapped[int] = mapped_column(
        ForeignKey("healthcare_provider.id")
    )
    performing_healthcare_provider: Mapped[HealthcareProvider] = relationship(
        back_populates="performed_healthcare_provider_group_member"
    )
    "Each HealthcareProviderGroupMember always is a function performed by one HealthcareProvider."
    "Each HealthcareProvider might function as one or more HealthcareProviderGroupMember."