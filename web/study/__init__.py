from dataclasses import dataclass

from flask import Blueprint, redirect, render_template, request, url_for
from flask_babel import _
from sqlalchemy import distinct, func

from umdb import (
    Study,
    StudyProtocol,
    StudyProtocolVersion,
    StudySite,
    StudySiteProtocolVersionRelationship,
    StudySubject,
    StudySubjectProtocolVersionRelationship,
)
from web.breadcrumbs import Breadcrumb, breadcrumbs
from web.db import db

from . import subject

blueprint = Blueprint("study", __name__, url_prefix="/studies")


@blueprint.before_request
def setup_studies_breadcrumb():
    breadcrumbs.append(Breadcrumb(url_for("study.index"), _("Studies")))

    if request.view_args and "study_id" in request.view_args:
        study_id = request.view_args["study_id"]
        study = db.session.query(Study).filter_by(id=study_id).one()
        breadcrumbs.append(Breadcrumb(url_for("study.show", id=study_id), str(study)))


blueprint.register_blueprint(
    subject.blueprint, url_prefix=f"/<int:study_id>/{subject.blueprint.url_prefix}"
)


def count_subjects():
    rows = (
        db.session.query(
            StudyProtocol.planned_study_id,
            func.count(distinct(StudySubject.id)).label("n"),
        )
        .join(StudySubject.assigned_study_subject_protocol_version_relationship)
        .join(
            StudySubjectProtocolVersionRelationship.assigning_study_site_protocol_version_relationship
        )
        .join(StudySiteProtocolVersionRelationship.executed_study_protocol_version)
        .join(StudyProtocolVersion.versioned_study_protocol)
        .group_by(StudyProtocol.planned_study_id)
        .all()
    )
    counts = {r.planned_study_id: r.n for r in rows}
    return counts


def count_sites():
    rows = (
        db.session.query(
            StudyProtocol.planned_study_id,
            func.count(distinct(StudySite.id)).label("n"),
        )
        .join(StudySite.executed_study_site_protocol_version_relationship)
        .join(StudySiteProtocolVersionRelationship.executed_study_protocol_version)
        .join(StudyProtocolVersion.versioned_study_protocol)
        .group_by(StudyProtocol.planned_study_id)
        .all()
    )
    counts = {r.planned_study_id: r.n for r in rows}
    return counts


@dataclass
class StudyInfo:
    study: Study
    subjects: int
    sites: int


def gather_studies_info():
    studies = db.session.query(Study).all()
    subjects = count_subjects()
    sites = count_sites()
    return [StudyInfo(s, subjects.get(s.id, 0), sites.get(s.id, 0)) for s in studies]


@blueprint.route("/")
def index():
    info = gather_studies_info()
    return render_template("study/index.html", info=info)


@blueprint.route("/<id>")
def show(id: int):
    return redirect(url_for(".subject.index", study_id=id))
