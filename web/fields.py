from flask_babel import get_locale
from wtforms import fields, widgets

from .dates import parse_date, parse_datetime


class SelectBooleanField(fields.SelectField):
    default_choices = (("", ""), ("false", "No"), ("true", "Yes"))

    def _coerce(self, x):
        if x == "" or x is None:
            return None
        if x == "false" or x is False:
            return False
        if x == "true" or x is True:
            return True
        raise RuntimeError("Unknown value")

    def __init__(self, *args, choices=None, **kwargs):
        if choices is None:
            choices = self.default_choices
        kwargs["coerce"] = self._coerce
        super().__init__(*args, choices=choices, **kwargs)


class DateField(fields.DateField):
    widget = widgets.TextInput()

    def process_formdata(self, valuelist):
        if not valuelist:
            return

        date_str = " ".join(valuelist)
        try:
            self.data = parse_date(date_str, get_locale())
            return
        except ValueError:
            self.data = None

        raise ValueError(self.gettext("Not a valid date value."))


class DateTimeField(fields.DateTimeField):
    widget = widgets.TextInput()

    def process_formdata(self, valuelist):
        if not valuelist:
            return

        date_str = " ".join(valuelist)
        try:
            self.data = parse_datetime(date_str, get_locale())
            return
        except ValueError:
            self.data = None

        raise ValueError(self.gettext("Not a valid datetime value."))
