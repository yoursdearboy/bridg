from flask_admin.contrib.sqla.form import InlineOneToOneModelConverter
from flask_admin.model.form import InlineFormAdmin

from umdb import (
    HealthcareFacility,
    HealthcareProvider,
    HealthcareProviderGroup,
    Name,
    Organization,
    OrganizationName,
    Person,
    StudySubject,
)

from .view import MyModelView


class PersonView(MyModelView):
    model = Person
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
    model = Organization
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
    model = Organization
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


class HealthcareProviderInlineForm(InlineFormAdmin):
    inline_converter = InlineOneToOneModelConverter
    form_columns = [
        "role",
        "staffed_healthcare_facility",
        "employing_organization",
        "performed_healthcare_provider_group",
    ]


class HealthcareProviderView(MyModelView):
    model = Person
    column_list = [
        "id",
        "primary_name",
        "performed_healthcare_provider.staffed_healthcare_facility",
        "performed_healthcare_provider.employing_organization",
    ]
    column_labels = {
        "primary_name": "Name",
        "performed_healthcare_provider.staffed_healthcare_facility": "Staffed healthcare facility",
        "performed_healthcare_provider.employing_organization": "Employing organization",
    }
    form_excluded_columns = ["type", "primary_name"]
    inline_models = [Name, HealthcareProviderInlineForm(HealthcareProvider)]

    def get_query(self):
        return super().get_query().filter(Person.performed_healthcare_provider != None)


class HealthcareProviderGroupInlineForm(InlineFormAdmin):
    inline_converter = InlineOneToOneModelConverter
    form_columns = ["using_healthcare_facility", "grouped_healthcare_provider"]


class HealthcareProviderGroupView(MyModelView):
    model = Organization
    column_list = ["id", "primary_name", "type", "description"]
    form_excluded_columns = [
        "performed_healthcare_facility",
        "employed_healthcare_provider",
    ]

    inline_models = [
        OrganizationName,
        HealthcareProviderGroupInlineForm(HealthcareProviderGroup),
    ]

    def get_query(self):
        return (
            super()
            .get_query()
            .filter(Organization.performed_healthcare_provider_group != None)
        )


class StudySubjectview(MyModelView):
    model = StudySubject
    column_list = [
        "id",
        "performing_entity",
        "status",
        "status_date",
        "assigned_study_site_protocol_version_relationship",
    ]
    column_formatters = {
        "assigned_study_site_protocol_version_relationship": (
            lambda v, c, m, p: "\n".join(
                map(str, m.assigned_study_site_protocol_version_relationship)
            )
        )
    }
    form_columns = [
        "performing_biologic_entity",
        "performing_organization",
        "status",
        "status_date",
        "assigned_study_site_protocol_version_relationship",
    ]
