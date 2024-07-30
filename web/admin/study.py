from flask_admin.model.form import InlineFormAdmin

from umdb.study import (
    Study,
    StudyConduct,
    StudyProtocol,
    StudyProtocolVersion,
    StudySite,
    StudySubject,
)
from web.admin.view import MyInlineOneToOneModelConverter, MyModelView


class StudyConductInlineForm(InlineFormAdmin):
    inline_converter = MyInlineOneToOneModelConverter
    form_columns = ["executing_study_site"]


class StudyView(MyModelView):
    model = Study
    column_list = ["id", "name", "type", "description"]
    form_columns = ["name", "type", "description"]
    inline_models = [StudyConductInlineForm(StudyConduct)]


class StudyProtocolVersionInlineForm(InlineFormAdmin):
    form_columns = ["id", "acronym", "executing_study_site"]


class StudyProtocolView(MyModelView):
    model = StudyProtocol
    column_list = ["id", "planned_study"]
    form_columns = ["planned_study"]
    inline_models = [StudyProtocolVersionInlineForm(StudyProtocolVersion)]


class StudySiteView(MyModelView):
    model = StudySite
    column_list = [
        "id",
        "performing_entity",
        "lead",
        "executed_study_conduct",
        "executing_project",
    ]
    form_columns = ["performing_healthcare_facility", "performing_organization", "lead"]


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
