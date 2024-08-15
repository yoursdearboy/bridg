# type: ignore
from flask_babel import lazy_gettext as _
from flask_wtf import FlaskForm
from wtforms import StringField


class NameForm(FlaskForm):
    family = StringField(_("Family name"))
    middle = StringField(_("Middle name"))
    given = StringField(_("Given name"))
    patronymic = StringField(_("Patronymic"))
    prefix = StringField(_("Prefix"))
    suffix = StringField(_("Suffix"))
    use = StringField(_("Use"))
