from flask_babel import _
from wtforms import fields, widgets


class SelectField(fields.SelectField):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.choices = [("", "")] + self.choices  # type: ignore


class SelectBooleanField(SelectField):
    default_choices = (("false", "No"), ("true", "Yes"))

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


class DateLocaleMixin:
    def _localize_format(self, format):
        return _(format)


class DateField(DateLocaleMixin, fields.DateField):
    widget = widgets.TextInput()

    def __init__(self, label=None, validators=None, format="%Y-%m-%d", **kwargs):
        _("%Y-%m-%d")  # to put in messages file
        format = self._localize_format(format)
        super().__init__(label, validators, format, **kwargs)

    def process_formdata(self, valuelist):
        if not valuelist:
            return

        date_str = " ".join(valuelist)

        if date_str == "":
            self.data = None
            return

        return super().process_formdata(valuelist)


class DateTimeField(DateLocaleMixin, fields.DateTimeField):
    widget = widgets.TextInput()

    def __init__(
        self, label=None, validators=None, format="%Y-%m-%d %H:%M:%S", **kwargs
    ):
        _("%Y-%m-%d %H:%M:%S")  # to put in messages file
        format = self._localize_format(format)
        super().__init__(label, validators, format, **kwargs)

    def process_formdata(self, valuelist):
        if not valuelist:
            return

        date_str = " ".join(valuelist)

        if date_str == "":
            self.data = None
            return

        return super().process_formdata(valuelist)


class SelectEnumField(SelectField):
    def __init__(
        self,
        label=None,
        enum=None,
        coerce=None,
        choices=None,
        **kwargs,
    ):
        if enum is None:
            raise ValueError("enum required")
        self.enum = enum
        if coerce is None:
            coerce = self._coerce
        if choices is None:
            choices = self._choices()
        super().__init__(label=label, coerce=coerce, choices=choices, **kwargs)

    def _coerce(self, x):
        if x is None:
            return
        if x == "":
            return
        if isinstance(x, self.enum):
            return x
        return self.enum(x)

    def _choices(self):
        return [(e.value, e.name) for e in self.enum]
