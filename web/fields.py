from wtforms import fields


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
