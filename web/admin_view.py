from datetime import date

from flask_admin.contrib.sqla import ModelView
from flask_admin.contrib.sqla.form import AdminModelConverter
from flask_admin.model import typefmt
from flask_admin.model.form import converts

from . import fields


def date_format(view, value):
    return value.strftime("%d.%m.%Y")


FORMATTERS = {**typefmt.BASE_FORMATTERS, date: date_format}


class MyModelConverter(AdminModelConverter):
    # FIXME: pull format from localization
    @converts("Date")
    def convert_date(self, field_args, **extra):
        if "format" not in field_args:
            field_args["format"] = "%d.%m.%Y"
        if "render_kw" not in field_args:
            field_args["render_kw"] = dict()
        if "data-date-format" not in field_args["render_kw"]:
            field_args["render_kw"]["data-date-format"] = "DD.MM.YYYY"
        return super().convert_date(field_args, **extra)

    @converts("Boolean", "sqlalchemy.dialects.mssql.base.BIT")
    def conv_Boolean(self, field_args, **extra):
        return fields.SelectBooleanField(**field_args)


class MyModelView(ModelView):
    model_form_converter = MyModelConverter
    column_type_formatters = FORMATTERS
