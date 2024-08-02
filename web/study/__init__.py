from dataclasses import dataclass

from flask import Blueprint, redirect, render_template, url_for
from sqlalchemy import distinct, func

from umdb.study import (
    Study,
    StudyProtocol,
    StudyProtocolVersion,
    StudySite,
    StudySiteProtocolVersionRelationship,
    StudySubject,
    StudySubjectProtocolVersionRelationship,
)
from web.db import db

from . import subject

blueprint = Blueprint("study", __name__, url_prefix="/studies", template_folder=".")

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
    return [StudyInfo(s, subjects[s.id], sites[s.id]) for s in studies]


@blueprint.route("/")
def index():
    info = gather_studies_info()
    return render_template("index.html", info=info)


@blueprint.route("/<id>")
def show(id: int):
    return redirect(url_for("study.subject.index", study_id=id))
