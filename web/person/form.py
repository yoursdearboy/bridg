# type: ignore
from flask_babel import lazy_gettext as _
from flask_wtf import FlaskForm
from wtforms import BooleanField

from bridg import AdministrativeGender
from web.fields import DateField, SelectBooleanField, SelectEnumField


class PersonForm(FlaskForm):
    administrative_gender = SelectEnumField(
        _("Administrative gender"), AdministrativeGender
    )
    birth_date = DateField(_("Birth date"))
    death_date = DateField(_("Death date"))
    death_date_estimated_indicator = BooleanField(_("Death date estimated?"))
    death_indicator = SelectBooleanField(_("Dead"))
