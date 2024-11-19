from dataclasses import dataclass
from itertools import groupby

from flask import Blueprint, render_template, url_for
from flask_babel import lazy_gettext as _
from sqlalchemy import distinct, func
from sqlalchemy.orm import Bundle, aliased

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


@dataclass
class Count:
    group: Study | StudyProtocolVersion
    sites: int
    subjects: int


def count():
    base = (
        db.session.query(
            func.count(distinct(StudySiteProtocolVersionRelationship.executing_study_site_id)).label("sites"),
            func.count(distinct(StudySubjectProtocolVersionRelationship.assigning_study_subject_id)).label("subjects"),
        )
        .outerjoin(Study.planning_study_protocol)
        .outerjoin(StudyProtocol.versioning_study_protocol_version)
        .outerjoin(StudyProtocolVersion.executing_study_site_protocol_version_relationship)
        .outerjoin(StudySiteProtocolVersionRelationship.assigned_study_subject_protocol_version_relationship)
    )
    by_study = base.add_columns(Study).group_by(Study).subquery()
    by_version = base.add_columns(Study, StudyProtocolVersion).group_by(Study, StudyProtocolVersion).subquery()

    q = db.session.query(
        aliased(Study, by_study, "study"),
        Bundle("by_study", by_study.c.sites, by_study.c.subjects),
        aliased(StudyProtocolVersion, by_version, "version"),
        Bundle("by_version", by_version.c.sites, by_version.c.subjects),
    ).outerjoin(by_version, by_study.c.id == by_version.c.id)

    def _study(x):
        return Count(x.study, **x.by_study._asdict())

    def _version(x):
        return Count(x.version, **x.by_version._asdict())

    counts = q.all()
    counts = [(x, list(map(_version, y))) for x, y in groupby(counts, _study)]

    return counts


def index():
    breadcrumbs.append(Breadcrumb(url_for(".index"), _("Studies")))
    return render_template("study/index.html", counts=count())


blueprint.add_url_rule("/", view_func=index, endpoint="index")
