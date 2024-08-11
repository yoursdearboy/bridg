from flask_admin.model.form import InlineFormAdmin

from umdb import StudyProtocolVersion
from umdb.protocol.protocol import StudyProtocol

from .view import MyModelView


class StudyProtocolVersionInlineForm(InlineFormAdmin):
    form_columns = ["id", "acronym", "executing_study_site"]


class StudyProtocolView(MyModelView):
    model = StudyProtocol
    column_list = ["id", "planned_study"]
    form_columns = ["planned_study"]
    inline_models = [StudyProtocolVersionInlineForm(StudyProtocolVersion)]
