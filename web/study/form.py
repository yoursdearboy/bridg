from flask_babel import lazy_gettext as _
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField


class StudyForm(FlaskForm):
    name = StringField(_("Name"))
    type = StringField(_("Type"))
    description = TextAreaField(_("Description"))
