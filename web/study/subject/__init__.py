from datetime import datetime
from typing import List

from flask import (
    Blueprint,
    abort,
    redirect,
    render_template,
    request,
    url_for,
)
from flask_babel import lazy_gettext as _

from umdb import (
    Name,
    Person,
    Status,
    StudyProtocolVersion,
    StudySiteProtocolVersionRelationship,
    StudySubject,
    StudySubjectProtocolVersionRelationship,
)
from web.breadcrumbs import Breadcrumb, breadcrumbs
from web.db import db
from web.htmx import htmx

from . import schema
from .form import StudySubjectForm

blueprint = Blueprint(
    "subject", __name__, url_prefix="/subjects", template_folder=".", static_folder="."
)


@blueprint.before_request
def setup_breadcrumbs():
    if request.view_args and "study_id" in request.view_args:
        study_id = request.view_args["study_id"]
        breadcrumbs.append(
            Breadcrumb(url_for("study.subject.index", study_id=study_id), _("Subjects"))
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

    breadcrumbs.append(Breadcrumb(url_for(".new", study_id=study_id), _("New")))

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
    breadcrumbs.append(
        Breadcrumb(
            url_for(".show", study_id=study_id, subject_id=subject_id),
            str(subject.performing_entity),
        )
    )
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
