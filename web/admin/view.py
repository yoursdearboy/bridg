from datetime import date

from flask_admin.contrib.sqla import ModelView
from flask_admin.contrib.sqla.form import (
    AdminModelConverter,
    InlineOneToOneModelConverter,
)
from flask_admin.model import typefmt
from flask_admin.model.form import converts

from web import fields


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


class MyInlineOneToOneModelConverter(InlineOneToOneModelConverter):
    def _calculate_mapping_key_pair(self, model, info):
        mapper = info.model._sa_class_manager.mapper.base_mapper
        target_mapper = model._sa_class_manager.mapper

        inline_relationship = dict()

        for forward_prop in mapper.iterate_properties:
            if not hasattr(forward_prop, "direction"):
                continue

            if forward_prop.direction.name != "MANYTOONE":
                continue

            # TODO: Push this line to upstream
            if not issubclass(target_mapper.class_, forward_prop.mapper.class_):
                continue

            # in case when model has few relationships to target model or
            # has just installed references manually. This is more quick
            # solution rather than rotate yet another one loop
            ref = getattr(forward_prop, "backref")

            if not ref:
                ref = getattr(forward_prop, "back_populates")

            if ref:
                inline_relationship[ref] = forward_prop.key
                continue

            # here we suppose that model has only one relationship
            # to target model and prop has not any reference
            for backward_prop in target_mapper.iterate_properties:
                if not hasattr(backward_prop, "direction"):
                    continue

                if backward_prop.direction.name != "ONETOMANY":
                    continue

                if issubclass(model, backward_prop.mapper.class_):
                    inline_relationship[backward_prop.key] = forward_prop.key
                    break
            else:
                raise Exception(
                    "Cannot find reverse relation for model %s" % info.model
                )
            break

        if not inline_relationship:
            raise Exception("Cannot find forward relation for model %s" % info.model)

        return inline_relationship


class MyModelView(ModelView):
    model_form_converter = MyModelConverter
    column_type_formatters = FORMATTERS

    def _get_endpoint(self, endpoint):
        if endpoint:
            return endpoint
        endpoint = super()._get_endpoint(endpoint)
        return f"{endpoint}-admin"

    def _get_view_url(self, admin, url):
        """
        Generate URL for the view. Override to change default behavior.
        """
        model_name = self.model.__name__.lower()
        if url is None:
            if admin.url != "/":
                url = "%s/%s" % (admin.url, model_name)
            else:
                if self == admin.index_view:
                    url = "/"
                else:
                    url = "/%s" % model_name
        else:
            if not url.startswith("/"):
                url = "%s/%s" % (admin.url, url)

        return url
