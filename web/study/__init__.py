from dataclasses import dataclass

from flask import Blueprint, render_template, request, url_for
from flask_babel import _
from sqlalchemy import distinct, func

from bridg import (
    Study,
    StudyProtocol,
    StudyProtocolVersion,
    StudySiteProtocolVersionRelationship,
    StudySubjectProtocolVersionRelationship,
)
from web.breadcrumbs import Breadcrumb, breadcrumbs
from web.db import db

blueprint = Blueprint("study", __name__, url_prefix="/studies")


@blueprint.before_request
def setup_studies_breadcrumb():
    breadcrumbs.append(Breadcrumb(url_for("study.index"), _("Studies")))

    if request.view_args and "study_id" in request.view_args:
        study_id = request.view_args["study_id"]
        study = db.session.query(Study).filter_by(id=study_id).one_or_none()
        if study:
            breadcrumbs.append(
                Breadcrumb(url_for("study.show", id=study_id), str(study))
            )


def count():
    return (
        db.session.query(
            StudyProtocol.planned_study_id.label("study"),
            func.count(
                distinct(StudySiteProtocolVersionRelationship.executing_study_site_id)
            ).label("sites"),
            func.count(
                distinct(
                    StudySubjectProtocolVersionRelationship.assigning_study_subject_id
                )
            ).label("subjects"),
        )
        .outerjoin(StudyProtocol.versioning_study_protocol_version)
        .outerjoin(
            StudyProtocolVersion.executing_study_site_protocol_version_relationship
        )
        .outerjoin(
            StudySiteProtocolVersionRelationship.assigned_study_subject_protocol_version_relationship
        )
        .group_by(StudyProtocol.planned_study_id)
        .all()
    )


@dataclass
class StudyInfo:
    study: Study
    sites: int
    subjects: int


def index():
    info = [StudyInfo(c.study, c.sites, c.subjects) for c in count()]
    return render_template("study/index.html", info=info)


blueprint.add_url_rule("/", view_func=index, endpoint="index")
