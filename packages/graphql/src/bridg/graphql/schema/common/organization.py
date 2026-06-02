from __future__ import annotations

from typing import TYPE_CHECKING, Annotated, List, Optional

import strawberry

import bridg.alchemy

from ..datatype import OrganizationName as OrganizationNameDataType

if TYPE_CHECKING:
    from ...context import Context
    from .healthcare_facility import HealthcareFacility
    from .subject import Subject


@strawberry.type
class Organization:
    id: strawberry.ID

    name: List[OrganizationName]
    type: Optional[str]
    description: Optional[str]
    actual: bool

    performed_healthcare_facility: Optional[Annotated[HealthcareFacility, strawberry.lazy(".healthcare_facility")]]

    # performed_healthcare_provider_group: Optional[HealthcareProviderGroup]
    # employed_healthcare_provider: List[HealthcareProvider]

    performed_subject: List[Annotated[Subject, strawberry.lazy(".subject")]]

    @strawberry.field
    def primary_name(self) -> Optional[OrganizationName]:
        if len(self.name) > 0:
            return self.name[0]


@strawberry.type
class OrganizationName(OrganizationNameDataType):
    id: strawberry.ID


@strawberry.input
class OrganizationFilter:
    name: Optional[str] = None


@strawberry.type
class OrganizationQuery:
    @strawberry.field(name="OrganizationList")
    def organization_list(
        self, filter: Optional[OrganizationFilter] = None, *, info: strawberry.Info[Context]
    ) -> List[Organization]:
        session = info.context.session
        query = session.query(bridg.alchemy.Organization)
        if filter and filter.name:
            query = query.filter(
                bridg.alchemy.Organization.name.any(
                    bridg.alchemy.OrganizationName.value.ilike(f"%{filter.name}%")
                )
            )
        return query.all()  # type: ignore
