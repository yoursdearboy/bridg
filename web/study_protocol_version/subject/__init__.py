from datetime import datetime

from flask import Blueprint, abort, request, url_for
from flask_babel import lazy_gettext as _

from bridg import (
    PlannedStudySubject,
    Status,
    StudyProtocolVersion,
    StudySiteProtocolVersionRelationship,
    StudySubject,
    StudySubjectProtocolVersionRelationship,
)
from bridg.api.protcol import construct_subject
from web.breadcrumbs import Breadcrumb, breadcrumbs
from web.db import db
from web.views import (
    BreadcrumbsMixin,
    CreateView,
    DeleteView,
    EditView,
    HTMXDeleteMixin,
    IndexDataTableView,
    ShowView,
)

from .form import StudySubjectForm
from .lookup import lookup
from .schema import StudySubjectList

blueprint = Blueprint("subject", __name__, url_prefix="/subjects")


@blueprint.before_request
def setup_breadcrumbs():
    if request.view_args and "study_protocol_version_id" in request.view_args:
        study_protocol_version_id = request.view_args["study_protocol_version_id"]
        breadcrumbs.append(
            Breadcrumb(
                url_for(
                    "study_protocol_version.subject.index",
                    study_protocol_version_id=study_protocol_version_id,
                ),
                _("Subjects"),
            )
        )


class StudyProtocolVersionSubjectIndexView(IndexDataTableView):
    model = StudySubject
    schema = StudySubjectList
    template_name = "study_protocol_version/subject/index.html"

    def get_study_protocol_version(self, study_protocol_version_id, **kwargs):
        study = (
            db.session.query(StudyProtocolVersion)
            .filter_by(id=study_protocol_version_id)
            .one_or_none()
        )
        if not study:
            return abort(404)
        return study

    def get_query(self, study_protocol_version_id, **kwargs):
        study_protocol_version = self.get_study_protocol_version(
            study_protocol_version_id
        )
        return (
            db.session.query(StudySubject)
            .join(StudySubject.assigned_study_subject_protocol_version_relationship)
            .join(
                StudySubjectProtocolVersionRelationship.assigning_study_site_protocol_version_relationship
            )
            .filter(
                StudySiteProtocolVersionRelationship.executed_study_protocol_version
                == study_protocol_version
            )
        )


def _get_study_protocol_version(id: int):
    return db.session.query(StudyProtocolVersion).filter_by(id=id).one()


def _get_planned_study_subject(version: StudyProtocolVersion):
    subjects = version.intended_planned_study_subject
    if len(subjects) > 0:
        return subjects[0]
    raise ValueError("No planned study subjects")


def _get_study_site_protocol_version_relationship(version: StudyProtocolVersion):
    return version.executing_study_site_protocol_version_relationship


def _get_performing(subject: PlannedStudySubject):
    if subject.performing_biologic_entity:
        return "biologic_entity"
    if subject.performing_organization:
        return "organization"
    raise ValueError("Unknown performing entity")


class StudyProtocolVersionSubjectCreateView(BreadcrumbsMixin, CreateView):
    db = db
    template_name = "study_protocol_version/subject/new.html"

    def setup(self, study_protocol_version_id: int, **kwargs):
        self.study_protocol_version = _get_study_protocol_version(
            study_protocol_version_id
        )
        self.planned_study_subject = _get_planned_study_subject(
            self.study_protocol_version
        )
        super().setup(study_protocol_version_id=study_protocol_version_id, **kwargs)

    def get_context(self):
        ctx = super().get_context()
        ctx["planned_study_subject"] = self.planned_study_subject
        return ctx

    def get_object(self, **kwargs):
        subject = construct_subject(self.planned_study_subject)
        subject.status = Status.candidate
        subject.status_date = datetime.now()
        return subject

    def get_form(self, object, **kwargs):
        return StudySubjectForm(
            obj=object,
            performing=_get_performing(self.planned_study_subject),
            assigned_study_site_protocol_version_relationship_query=(
                _get_study_site_protocol_version_relationship(
                    self.study_protocol_version
                )
            ),
        )

    def url_for_redirect(self, study_protocol_version_id, **kwargs):
        return url_for(".index", study_protocol_version_id=study_protocol_version_id)

    def add_breadcrumbs(self, study_protocol_version_id, **kwargs):
        self.breadcrumbs.extend(
            Breadcrumb(
                url_for(".new", study_protocol_version_id=study_protocol_version_id),
                _("New"),
            )
        )


def lookup_view(study_protocol_version_id: int, **kwargs):
    study_protcol_version = _get_study_protocol_version(study_protocol_version_id)
    planned_study_subject = _get_planned_study_subject(study_protcol_version)
    subject = construct_subject(planned_study_subject)
    form = StudySubjectForm(
        performing=_get_performing(planned_study_subject),
        assigned_study_site_protocol_version_relationship_query=(
            _get_study_site_protocol_version_relationship(study_protcol_version)
        ),
    )
    form.populate_obj(obj=subject)
    subjects = lookup(subject, db.session)
    return StudySubjectList.model_validate(subjects).model_dump()


class StudyProtocolVersionSubjectShowView(BreadcrumbsMixin, ShowView):
    db = db
    model = StudySubject
    template_name = "study_protocol_version/subject/show.html"

    def get_context(self):
        ctx = super().get_context()
        ctx["subject"] = ctx["object"]
        return ctx

    def add_breadcrumbs(self, study_protocol_version_id, id, **kwargs):
        self.breadcrumbs.append(
            Breadcrumb(
                url_for(
                    ".show", study_protocol_version_id=study_protocol_version_id, id=id
                ),
                str(self.object.performing_entity),
            )
        )


class StudyProtocolVersionSubjectEditView(BreadcrumbsMixin, EditView):
    db = db
    model = StudySubject
    template_name = "study_protocol_version/subject/edit.html"

    def setup(self, study_protocol_version_id: int, **kwargs):
        self.study_protocol_version = _get_study_protocol_version(
            study_protocol_version_id
        )
        self.planned_study_subject = _get_planned_study_subject(
            self.study_protocol_version
        )
        super().setup(study_protocol_version_id=study_protocol_version_id, **kwargs)

    def get_form(self, object, **kwargs):
        return StudySubjectForm(
            obj=object,
            performing=_get_performing(self.planned_study_subject),
            assigned_study_site_protocol_version_relationship_query=(
                _get_study_site_protocol_version_relationship(
                    self.study_protocol_version
                )
            ),
        )

    def url_for_redirect(self, study_protocol_version_id, id, **kwargs):
        return url_for(
            ".show", study_protocol_version_id=study_protocol_version_id, id=id
        )

    def add_breadcrumbs(self, study_protocol_version_id, id, **kwargs):
        self.breadcrumbs.extend(
            Breadcrumb(
                url_for(
                    ".show", study_protocol_version_id=study_protocol_version_id, id=id
                ),
                str(self.object.performing_entity),
            ),
            Breadcrumb(
                url_for(
                    ".edit", study_protocol_version_id=study_protocol_version_id, id=id
                ),
                _("Edit"),
            ),
        )


class StudyProtocolVersionSubjectDeleteView(HTMXDeleteMixin, DeleteView):
    db = db
    model = StudySubject

    def url_for_redirect(self, study_protocol_version_id, **kwargs):
        return url_for(".index", study_protocol_version_id=study_protocol_version_id)


blueprint.add_url_rule(
    "/", view_func=StudyProtocolVersionSubjectIndexView.as_view("index")
)
blueprint.add_url_rule(
    "/new", view_func=StudyProtocolVersionSubjectCreateView.as_view("new")
)
blueprint.add_url_rule(
    "/lookup", view_func=lookup_view, endpoint="lookup", methods=["POST"]
)
blueprint.add_url_rule(
    "/<id>", view_func=StudyProtocolVersionSubjectShowView.as_view("show")
)
blueprint.add_url_rule(
    "/<id>/edit", view_func=StudyProtocolVersionSubjectEditView.as_view("edit")
)
blueprint.add_url_rule(
    "/<id>", view_func=StudyProtocolVersionSubjectDeleteView.as_view("delete")
)
