import sqlalchemy as sa
import sqlalchemy_utils as sau
import wtforms
from flask_wtf import FlaskForm
from wtforms_alchemy import ClassMap, FormGenerator, model_form_factory

from . import fields
from .db import db


class MyFormGenerator(FormGenerator):
    def length_validator(self, column):
        if isinstance(column.type, sa.types.Enum):
            return
        return super().length_validator(column)

    def select_field_kwargs(self, column):
        kwargs = super().select_field_kwargs(column)
        if isinstance(column.type, sau.types.ChoiceType):
            pass
        elif "choices" in column.info and column.info["choices"]:
            pass
        else:
            cls = column.type.python_type

            def coerce(x):
                if x is None:
                    return
                if x == "":
                    return
                if isinstance(x, cls):
                    return x
                return cls(x)

            kwargs["coerce"] = coerce
            kwargs["choices"] = [(e.value, e.name) for e in cls]

        kwargs["choices"] = [("", "")] + kwargs["choices"]

        return kwargs

    def type_agnostic_parameters(self, key, column):
        kwargs = {}
        kwargs["description"] = column.info.get(
            "description", self.meta.descriptions.get(key, "")
        )
        kwargs["label"] = column.info.get("label", self.meta.labels.get(key, key))
        return kwargs


class ModelForm(model_form_factory(FlaskForm)):
    class Meta:
        descriptions = {}
        form_generator = MyFormGenerator
        labels = {}
        type_map = ClassMap(
            {
                sa.Boolean: fields.SelectBooleanField,
                sa.Date: fields.DateField,
                sa.DateTime: fields.DateTimeField,
                sa.Enum: wtforms.SelectField,
            }
        )

    @classmethod
    def get_session(cls):
        return db.session
