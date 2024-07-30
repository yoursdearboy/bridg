from flask import Blueprint, render_template

from umdb.study.protocol import (
    StudyProtocolVersion,
    StudySiteProtocolVersionRelationship,
)
from umdb.study.subject import StudySubject, StudySubjectProtocolVersionRelationship
from web.db import db

blueprint = Blueprint("subject", __name__, url_prefix="/subjects", template_folder=".")


@blueprint.route("/")
def index(study_id: int):
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
    return render_template("index.html", subjects=subjects)
