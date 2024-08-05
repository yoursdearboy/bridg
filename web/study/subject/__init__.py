from datetime import datetime

import wtforms
from flask import Blueprint, abort, redirect, render_template, request, url_for
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

blueprint = Blueprint("subject", __name__, url_prefix="/subjects", template_folder=".")


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

    def post_init(self, study_id: int):
        session = db.session
        self.assigned_study_site_protocol_version_relationship.query_factory = lambda: (
            session.query(StudySiteProtocolVersionRelationship)
            .join(StudySiteProtocolVersionRelationship.executed_study_protocol_version)
            .filter(StudyProtocolVersion.versioned_study_protocol_id == study_id)
        )

    performing_biologic_entity = wtforms.FormField(BiologicEntityForm)
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

    form = StudySubjectForm(obj=subject)
    form.post_init(study_id)

    if request.method == "POST":
        if form.validate():
            form.populate_obj(subject)
            db.session.add(subject)
            db.session.commit()
            return redirect(url_for(".index", study_id=study_id))

    return render_template("new.html", study_id=study_id, form=form)


@blueprint.route("/<subject_id>")
def show(study_id: int, subject_id: int):
    subject = db.session.query(StudySubject).filter_by(id=subject_id).one_or_none()
    if not subject:
        abort(404)


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
