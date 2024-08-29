# type: ignore
from flask_babel import lazy_gettext as _
from flask_wtf import FlaskForm
from wtforms import (
    BooleanField,
    Form,
    FormField,
    IntegerField,
    StringField,
    TextAreaField,
)
from wtforms.validators import DataRequired, Optional
from wtforms_alchemy.fields import QuerySelectMultipleField

from umdb import (
    AdministrativeGender,
    BiologicEntity,
    Name,
    Organization,
    OrganizationName,
    PlannedStudySubject,
    Status,
    StudySiteProtocolVersionRelationship,
)
from web.fields import (
    DateField,
    DateTimeField,
    FieldList,
    SelectBooleanField,
    SelectEnumField,
)


class NameForm(Form):
    family = StringField(_("Family name"))
    middle = StringField(_("Middle name"))
    given = StringField(_("Given name"))
    patronymic = StringField(_("Patronymic"))
    prefix = StringField(_("Prefix"))
    suffix = StringField(_("Suffix"))
    use = StringField(_("Use"))


class BiologicEntityForm(Form):
    name = FieldList(
        FormField(NameForm),
        default=lambda: [Name()],
        min_entries=1,
        max_entries=1,
    )
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
    name = FieldList(
        FormField(OrganizationNameForm),
        default=lambda: [OrganizationName()],
        min_entries=1,
        max_entries=1,
    )
    type = StringField(_("Type"))
    description = TextAreaField(_("Description"))


class StudySubjectForm(FlaskForm):
    performing_biologic_entity = FormField(
        BiologicEntityForm,
        default=lambda: BiologicEntity(),
    )
    performing_biologic_entity_id = IntegerField(validators=[Optional()])
    performing_organization = FormField(
        OrganizationForm,
        default=lambda: Organization(),
    )
    performing_organization_id = IntegerField(validators=[Optional()])
    status = SelectEnumField(_("Status"), Status)
    status_date = DateTimeField(_("Status date"))
    # TODO: Split in two dependent selects for usability
    assigned_study_site_protocol_version_relationship = QuerySelectMultipleField(
        _("Study site and protocol"),
        validators=[DataRequired()],
    )

    def __init__(
        self,
        session,
        planned_study_subject: PlannedStudySubject,
        *args,
        **kwargs,
    ):
        super().__init__(*args, **kwargs)

        self.session = session
        self.planned_study_subject = planned_study_subject

        self.assigned_study_site_protocol_version_relationship.query_factory = lambda: (
            session.query(StudySiteProtocolVersionRelationship).filter(
                StudySiteProtocolVersionRelationship.executed_study_protocol_version
                == planned_study_subject.planned_for_study_protocol_version
            )
        )

        if self.planned_study_subject.performing_biologic_entity:
            del self.performing_organization, self.performing_organization_id

            if self.performing_biologic_entity_id.data:
                del self.performing_biologic_entity

        if self.planned_study_subject.performing_organization:
            del self.performing_biologic_entity, self.performing_biologic_entity_id

            if self.performing_organization_id.data:
                del self.performing_organization
