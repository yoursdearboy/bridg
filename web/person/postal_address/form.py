from flask_babel import lazy_gettext as _
from flask_wtf import FlaskForm
from wtforms import StringField


class AddressForm(FlaskForm):
    street = StringField(_("Street"))
    building = StringField(_("Building"))
    country = StringField(_("Country"))
    municipality = StringField(_("Municipality"))
    state = StringField(_("State"))
    zip = StringField(_("Zip"))
