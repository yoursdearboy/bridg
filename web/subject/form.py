from datetime import datetime
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

from bridg import AdministrativeGender, Status
from web.fields import DateField, DateTimeField, SelectBooleanField, SelectEnumField


class EntityNameForm(Form):
    family = StringField(_("Family name"))
    middle = StringField(_("Middle name"))
    given = StringField(_("Given name"))
    patronymic = StringField(_("Patronymic"))
    prefix = StringField(_("Prefix"))
    suffix = StringField(_("Suffix"))
    use = StringField(_("Use"))


class PostalAddressForm(Form):
    street = StringField(_("Street"))
    building = StringField(_("Building"))
    country = StringField(_("Country"))
    municipality = StringField(_("Municipality"))
    state = StringField(_("State"))
    zip = StringField(_("ZIP"))


class BiologicEntityForm(Form):
    name = FieldList(FormField(EntityNameForm), min_entries=1, max_entries=1)
    administrative_gender_code = SelectEnumField(_("Administrative gender"), AdministrativeGender)
    birth_date = DateField(_("Birth date"))
    death_date = DateField(_("Death date"))
    death_date_estimated_indicator = BooleanField(_("Death date estimated?"))
    death_indicator = SelectBooleanField(_("Dead"))
    postal_address = FieldList(FormField(PostalAddressForm), min_entries=1, max_entries=1)


class OrganizationNameForm(Form):
    value = StringField(_("Name"))


class OrganizationForm(Form):
    name = FieldList(FormField(OrganizationNameForm), min_entries=1, max_entries=1)
    type = StringField(_("Type"))
    description = TextAreaField(_("Description"))


class NewStudySubjectForm(FlaskForm):
    performing_biologic_entity = FormField(BiologicEntityForm)
    performing_biologic_entity_id = IntegerField(validators=[Optional()])
    performing_organization = FormField(OrganizationForm)
    performing_organization_id = IntegerField(validators=[Optional()])
    status = SelectEnumField(_("Status"), Status, default=Status.candidate)
    status_date = DateTimeField(_("Status date"), default=datetime.now())
    assigned_study_site_protocol_version_relationship = QuerySelectMultipleField(
        _("Study site and protocol"),
        validators=[DataRequired()],
    )

    def __init__(
        self,
        performing: Literal["biologic_entity", "organization"],
        assigned_study_site_protocol_version_relationship_query,
        *args,
        **kwargs,
    ):
        super().__init__(*args, **kwargs)

        self.performing = performing
        self.assigned_study_site_protocol_version_relationship.query = (
            assigned_study_site_protocol_version_relationship_query
        )


class EditStudySubjectForm(FlaskForm):
    status = SelectEnumField(_("Status"), Status)
    status_date = DateTimeField(_("Status date"))
    assigned_study_site_protocol_version_relationship = QuerySelectMultipleField(
        _("Study site and protocol"),
        validators=[DataRequired()],
    )

    def __init__(
        self,
        assigned_study_site_protocol_version_relationship_query,
        *args,
        **kwargs,
    ):
        super().__init__(*args, **kwargs)

        self.assigned_study_site_protocol_version_relationship.query = (
            assigned_study_site_protocol_version_relationship_query
        )
