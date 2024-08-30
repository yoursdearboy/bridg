# type: ignore
from typing import Literal

from flask_babel import lazy_gettext as _
from flask_wtf import FlaskForm
from wtforms import (
    BooleanField,
    FieldList,
    Form,
    FormField,
    IntegerField,
    StringField,
    TextAreaField,
)
from wtforms.validators import DataRequired, Optional
from wtforms_alchemy.fields import QuerySelectMultipleField

from umdb import AdministrativeGender, Status
from web.fields import DateField, DateTimeField, SelectBooleanField, SelectEnumField


class NameForm(Form):
    family = StringField(_("Family name"))
    middle = StringField(_("Middle name"))
    given = StringField(_("Given name"))
    patronymic = StringField(_("Patronymic"))
    prefix = StringField(_("Prefix"))
    suffix = StringField(_("Suffix"))
    use = StringField(_("Use"))


class BiologicEntityForm(Form):
    name = FieldList(FormField(NameForm), min_entries=1, max_entries=1)
    administrative_gender = SelectEnumField(
        _("Administrative gender"), AdministrativeGender
    )
    birth_date = DateField(_("Birth date"))
    death_date = DateField(_("Death date"))
    death_date_estimated_indicator = BooleanField(_("Death date estimated?"))
    death_indicator = SelectBooleanField(_("Dead"))


class OrganizationNameForm(Form):
    value = StringField(_("Name"))


class OrganizationForm(Form):
    name = FieldList(FormField(OrganizationNameForm), min_entries=1, max_entries=1)
    type = StringField(_("Type"))
    description = TextAreaField(_("Description"))


class StudySubjectForm(FlaskForm):
    performing_biologic_entity = FormField(BiologicEntityForm)
    performing_biologic_entity_id = IntegerField(validators=[Optional()])
    performing_organization = FormField(OrganizationForm)
    performing_organization_id = IntegerField(validators=[Optional()])
    status = SelectEnumField(_("Status"), Status)
    status_date = DateTimeField(_("Status date"))
    assigned_study_site_protocol_version_relationship = QuerySelectMultipleField(
        _("Study site and protocol"),
        validators=[DataRequired()],
    )

    def __init__(
        self,
        performing: Literal["biologic_entity", "organization"],
        *args,
        **kwargs,
    ):
        super().__init__(*args, **kwargs)

        self.performing = performing

        if performing == "biologic_entity":
            del self.performing_organization, self.performing_organization_id

            if self.performing_biologic_entity_id.data is not None:
                del self.performing_biologic_entity

        if performing == "organization":
            del self.performing_biologic_entity, self.performing_biologic_entity_id

            if self.performing_organization_id.data is not None:
                del self.performing_organization

    def populate_obj(self, obj):
        super().populate_obj(obj)

        if self.performing == "biologic_entity":
            if self.performing_biologic_entity_id.data is not None:
                del obj.performing_biologic_entity

        if self.performing == "organization":
            if self.performing_organization_id.data is not None:
                del obj.performing_organization
