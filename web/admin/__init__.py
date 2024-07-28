from flask_admin import Admin

from ..db import db
from .organization import (
    HealthcareFacilityView,
    HealthcareProviderGroupView,
    HealthcareProviderView,
    OrganizationView,
)
from .person import PersonView

admin = Admin(name="umdb", template_mode="bootstrap3")

admin.add_view(PersonView(PersonView.model, db.session))
admin.add_view(
    OrganizationView(
        OrganizationView.model,
        db.session,
        endpoint="organization",
        category="Organization",
    )
)
admin.add_view(
    HealthcareFacilityView(
        HealthcareFacilityView.model,
        db.session,
        name="Healthcare facility",
        endpoint="healthcare_facility",
        category="Organization",
    )
)
admin.add_view(
    HealthcareProviderView(
        HealthcareProviderView.model,
        db.session,
        name="Healthcare provider",
        endpoint="healthcare_provider",
        category="Organization",
    )
)
admin.add_view(
    HealthcareProviderGroupView(
        HealthcareProviderGroupView.model,
        db.session,
        name="Healthcare provider group",
        endpoint="healthcare_provider_group",
        category="Organization",
    )
)
