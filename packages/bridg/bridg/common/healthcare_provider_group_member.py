from __future__ import annotations

from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base

if TYPE_CHECKING:
    from .healthcare_provider import HealthcareProvider
    from .healthcare_provider_group import HealthcareProviderGroup


class HealthcareProviderGroupMember(Base):
    """
    DEFINITION:
    The role of an individual healthcare provider as a constituent part of a group.

    EXAMPLE(S):

    OTHER NAME(S):

    NOTE(S):
    """

    __tablename__ = "healthcare_provider_group_member"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    grouping_healthcare_provider_group_id: Mapped[UUID] = mapped_column(ForeignKey("healthcare_provider_group.id"))
    grouping_healthcare_provider_group: Mapped[HealthcareProviderGroup] = relationship(
        back_populates="grouped_healthcare_provider_group_member"
    )
    """
    Each HealthcareProviderGroupMember always belongs to one HealthcareProviderGroup.
    Each HealthcareProviderGroup always contains one or more HealthcareProviderGroupMember.
    """

    performing_healthcare_provider_id: Mapped[UUID] = mapped_column(ForeignKey("healthcare_provider.id"))
    performing_healthcare_provider: Mapped[HealthcareProvider] = relationship(
        back_populates="performed_healthcare_provider_group_member"
    )
    """
    Each HealthcareProviderGroupMember always is a function performed by one HealthcareProvider.
    Each HealthcareProvider might function as one or more HealthcareProviderGroupMember.
    """
