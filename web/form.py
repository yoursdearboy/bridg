import sqlalchemy as sa
import sqlalchemy_utils as sau
import wtforms
from flask_wtf import FlaskForm
from wtforms_alchemy import ClassMap, FormGenerator, model_form_factory

from . import fields
from .db import db


class MyFormGenerator(FormGenerator):
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

    def length_validator(self, column):
        if isinstance(column.type, sa.types.Enum):
            return
        return super().length_validator(column)


class ModelForm(model_form_factory(FlaskForm)):
    class Meta:
        form_generator = MyFormGenerator
        type_map = ClassMap(
            {
                sa.Enum: wtforms.SelectField,
                sa.Boolean: fields.SelectBooleanField,
            }
        )

    @classmethod
    def get_session(cls):
        return db.session
