# type: ignore
from flask_babel import lazy_gettext as _
from flask_wtf import FlaskForm
from wtforms import (
    BooleanField,
    FieldList,
    Form,
    FormField,
    IntegerField,
    StringField,
)
from wtforms.validators import DataRequired, Optional
from wtforms_alchemy.fields import QuerySelectMultipleField

from umdb import (
    AdministrativeGender,
    BiologicEntity,
    Status,
    StudyProtocolVersion,
    StudySiteProtocolVersionRelationship,
    StudySubject,
)
from web.db import db
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


class StudySubjectForm(FlaskForm):
    performing_biologic_entity = FormField(BiologicEntityForm)
    performing_biologic_entity_id = IntegerField(validators=[Optional()])
    status = SelectEnumField(_("Status"), Status)
    status_date = DateTimeField(_("Status date"))
    # TODO: Split in two dependent selects for usability
    assigned_study_site_protocol_version_relationship = QuerySelectMultipleField(
        _("Study site and protocol"),
        validators=[DataRequired()],
    )

    def __init__(self, study_id: int, *args, **kwargs):
        super().__init__(*args, **kwargs)

        session = db.session

        self.assigned_study_site_protocol_version_relationship.query_factory = lambda: (
            session.query(StudySiteProtocolVersionRelationship)
            .join(StudySiteProtocolVersionRelationship.executed_study_protocol_version)
            .filter(StudyProtocolVersion.versioned_study_protocol_id == study_id)
        )

        if self.performing_biologic_entity_id.data:
            del self.performing_biologic_entity

    def populate_obj(self, obj: StudySubject):
        super().populate_obj(obj)

        session = db.session

        if self.performing_biologic_entity_id.data:
            obj.performing_biologic_entity = (
                session.query(BiologicEntity)
                .filter_by(id=self.performing_biologic_entity_id.data)
                .one()
            )
