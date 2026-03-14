from __future__ import annotations

from typing import TYPE_CHECKING, Annotated, List, Optional

import strawberry

if TYPE_CHECKING:
    from .healthcare_facility import HealthcareFacility
    from .subject import Subject


@strawberry.type
class Organization:
    id: strawberry.ID

    name: List[OrganizationOrganizationName]
    type: Optional[str]
    description: Optional[str]
    actual: bool

    performed_healthcare_facility: Optional[Annotated[HealthcareFacility, strawberry.lazy(".healthcare_facility")]]

    # performed_healthcare_provider_group: Optional[HealthcareProviderGroup]
    # employed_healthcare_provider: List[HealthcareProvider]

    performed_subject: List[Annotated[Subject, strawberry.lazy(".subject")]]

    @strawberry.field
    def primary_name(self) -> Optional[OrganizationOrganizationName]:
        if len(self.name) > 0:
            return self.name[0]


@strawberry.type
class OrganizationOrganizationName:
    id: strawberry.ID
    use: Optional[str]
    value: Optional[str]
    prefix: Optional[str]
    suffix: Optional[str]
