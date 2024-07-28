from flask_admin import Admin
from flask_admin.contrib.sqla.form import InlineOneToOneModelConverter
from flask_admin.model.form import InlineFormAdmin

from umdb.organization import HealthcareFacility, Organization, OrganizationName
from umdb.person import Name, Person

from .admin_view import MyModelView
from .db import db

admin = Admin(name="umdb", template_mode="bootstrap3")


class PersonView(MyModelView):
    column_list = [
        "id",
        "primary_name",
        "administrative_gender",
        "birth_date",
        "death_date",
        "death_date_estimated_indicator",
        "death_indicator",
    ]
    form_excluded_columns = ["type", "primary_name"]
    inline_models = [Name]


class OrganizationView(MyModelView):
    column_list = ["id", "primary_name", "type", "description"]
    form_excluded_columns = [
        "performed_healthcare_facility",
        "performed_healthcare_provider_group",
        "employed_healthcare_provider",
    ]

    inline_models = [OrganizationName]


class HealthcareFacilityInlineForm(InlineFormAdmin):
    inline_converter = InlineOneToOneModelConverter


class HealthcareFacilityView(MyModelView):
    column_list = ["id", "primary_name", "type", "description"]
    form_excluded_columns = [
        "performed_healthcare_provider_group",
        "employed_healthcare_provider",
    ]

    inline_models = [OrganizationName, HealthcareFacilityInlineForm(HealthcareFacility)]

    def get_query(self):
        return (
            super()
            .get_query()
            .filter(Organization.performed_healthcare_facility != None)
        )


admin.add_view(PersonView(Person, db.session))
admin.add_view(OrganizationView(Organization, db.session, endpoint="organization"))
admin.add_view(
    HealthcareFacilityView(
        Organization,
        db.session,
        name="Healthcare facility",
        endpoint="healthcare_facility",
    )
)
