from flask import Blueprint, abort, render_template, request

from umdb.study.protocol import (
    StudyProtocolVersion,
    StudySiteProtocolVersionRelationship,
)
from umdb.study.subject import StudySubject, StudySubjectProtocolVersionRelationship
from web.db import db

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


@blueprint.route("/<subject_id>")
def show(study_id: int, subject_id: int):
    subject = db.session.query(StudySubject).filter_by(id=subject_id).one_or_none()
    if not subject:
        abort(404)
    return render_template("show.html", subject=subject)
