from datetime import datetime
from typing import List

import wtforms
from flask import (
    Blueprint,
    abort,
    redirect,
    render_template,
    request,
    url_for,
)
from flask_babel import _
from wtforms_alchemy.fields import QuerySelectMultipleField

from umdb import (
    BiologicEntity,
    Name,
    Person,
    Status,
    StudyProtocolVersion,
    StudySiteProtocolVersionRelationship,
    StudySubject,
    StudySubjectProtocolVersionRelationship,
)
from web.db import db
from web.form import ModelForm
from web.htmx import htmx

from . import schema

blueprint = Blueprint(
    "subject", __name__, url_prefix="/subjects", template_folder=".", static_folder="."
)


@blueprint.route("/")
def index(study_id: int):
    if request.is_json:
        subjects = (
            db.session.query(StudySubject)
            .join(StudySubject.assigned_study_subject_protocol_version_relationship)
            .join(
                StudySubjectProtocolVersionRelationship.assigning_study_site_protocol_version_relationship
            )
            .join(StudySiteProtocolVersionRelationship.executed_study_protocol_version)
            .filter(StudyProtocolVersion.versioned_study_protocol_id == study_id)
            .all()
        )
        return schema.StudySubjectList.model_validate(subjects).model_dump()
    return render_template("subject/index.html", study_id=study_id)


class NameForm(ModelForm):
    class Meta:
        csrf = False
        model = Name
        labels = {
            "family": _("Family name"),
            "middle": _("Middle name"),
            "given": _("Given name"),
            "patronymic": _("Patronymic"),
            "prefix": _("Prefix"),
            "suffix": _("Suffix"),
            "use": _("Use"),
        }


class BiologicEntityForm(ModelForm):
    class Meta:
        csrf = False
        model = BiologicEntity
        exclude = ("type",)
        labels = {
            "administrative_gender": _("Administrative gender"),
            "birth_date": _("Birth date"),
            "death_date": _("Death date"),
            "death_date_estimated_indicator": _("Death date estimated?"),
            "death_indicator": _("Dead"),
        }

    name = wtforms.FieldList(wtforms.FormField(NameForm), min_entries=1, max_entries=1)
    death_date_estimated_indicator = wtforms.BooleanField(
        label=Meta.labels["death_date_estimated_indicator"]
    )


class StudySubjectForm(ModelForm):
    class Meta:
        model = StudySubject
        exclude = ("type",)
        labels = {
            "status": _("Status"),
            "status_date": _("Status date"),
            "assigned_study_site_protocol_version_relationship": _("Study sites"),
        }

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

    performing_biologic_entity = wtforms.FormField(BiologicEntityForm)
    performing_biologic_entity_id = wtforms.IntegerField(
        validators=[wtforms.validators.Optional()]
    )
    assigned_study_site_protocol_version_relationship = QuerySelectMultipleField(
        label=Meta.labels["assigned_study_site_protocol_version_relationship"],
        validators=[wtforms.validators.DataRequired()],
    )


@blueprint.route("/new", methods=["GET", "POST"])
def new(study_id: int):
    name = Name()
    entity = Person(name=[name])
    subject = StudySubject(performing_biologic_entity=entity)
    subject.status = Status.candidate
    subject.status_date = datetime.now()

    form = StudySubjectForm(study_id=study_id, obj=subject)

    if request.method == "POST":
        if form.validate():
            form.populate_obj(subject)
            db.session.add(subject)
            db.session.commit()
            return redirect(url_for(".index", study_id=study_id))

    return render_template("new.html", study_id=study_id, form=form)


def _lookup(person: Person, limit=5) -> List[Person]:
    q = db.session.query(Person)
    if name := person.name[0]:
        q = q.filter(Person.name.any(Name.family.ilike(f"%{name.family}%")))
    return q.limit(limit).all()


@blueprint.route("/lookup", methods=["POST"])
def lookup(study_id: int):
    form = StudySubjectForm(study_id=study_id)
    person_form = form.performing_biologic_entity.form
    person = Person(name=[Name()])
    person_form.populate_obj(obj=person)
    persons = _lookup(person)
    return schema.BiologicEntityList.model_validate(persons).model_dump()


@blueprint.route("/<subject_id>")
def show(study_id: int, subject_id: int):
    subject = db.session.query(StudySubject).filter_by(id=subject_id).one_or_none()
    if not subject:
        abort(404)
    return render_template("show.html", study_id=study_id, subject=subject)


@blueprint.route("/<subject_id>", methods=["DELETE"])
def delete(study_id: int, subject_id: int):
    subject = db.session.query(StudySubject).filter_by(id=subject_id).one_or_none()

    if not subject:
        abort(404)

    db.session.delete(subject)
    db.session.commit()

    res = redirect(url_for(".index", study_id=study_id))
    if htmx:
        res.headers["HX-Redirect"] = res.headers.pop("Location")

    return res
