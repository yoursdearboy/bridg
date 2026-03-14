import strawberry

from .organization import Organization


@strawberry.type
class HealthcareFacility:
    id: strawberry.ID

    performing_organization: Organization

    # staffing_healthcare_provider: List[HealthcareProvider]
    # used_healthcare_provider_group: List[HealthcareProviderGroup]
