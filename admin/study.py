from flask_admin.model.form import InlineFormAdmin

from umdb import (
    Study,
    StudyConduct,
    StudySite,
)

from .view import MyInlineOneToOneModelConverter, MyModelView


class StudyConductInlineForm(InlineFormAdmin):
    inline_converter = MyInlineOneToOneModelConverter
    form_columns = ["executing_study_site"]


class StudyView(MyModelView):
    model = Study
    column_list = ["id", "name", "type", "description"]
    form_columns = ["name", "type", "description"]
    inline_models = [StudyConductInlineForm(StudyConduct)]


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
