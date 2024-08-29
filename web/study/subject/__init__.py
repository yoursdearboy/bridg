from datetime import datetime

from flask import Blueprint, abort, request, url_for
from flask_babel import lazy_gettext as _

from umdb import (
    Status,
    Study,
    StudyProtocol,
    StudyProtocolVersion,
    StudySiteProtocolVersionRelationship,
    StudySubject,
    StudySubjectProtocolVersionRelationship,
)
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
    if request.view_args and "study_id" in request.view_args:
        study_id = request.view_args["study_id"]
        breadcrumbs.append(
            Breadcrumb(url_for("study.subject.index", study_id=study_id), _("Subjects"))
        )


class StudySubjectIndexView(IndexDataTableView):
    model = StudySubject
    schema = StudySubjectList
    template_name = "study/subject/index.html"

    def get_study(self, study_id, **kwargs):
        study = db.session.query(Study).filter_by(id=study_id).one_or_none()
        if not study:
            return abort(404)
        return study

    def get_query(self, study_id, **kwargs):
        study = self.get_study(study_id)
        return (
            db.session.query(StudySubject)
            .join(StudySubject.assigned_study_subject_protocol_version_relationship)
            .join(
                StudySubjectProtocolVersionRelationship.assigning_study_site_protocol_version_relationship
            )
            .join(StudySiteProtocolVersionRelationship.executed_study_protocol_version)
            .join(StudyProtocolVersion.versioned_study_protocol)
            .filter(StudyProtocol.planned_study == study)
        )


def _get_planned_study_subject(study_id):
    study = db.session.query(Study).filter_by(id=study_id).one()
    if protocol := study.planning_study_protocol:
        # FIXME: take not first, but using id
        if version := protocol.versioning_study_protocol_version[0]:
            return version.intended_planned_study_subject[0]
    raise ValueError("No planned study subject")


class StudySubjectCreateView(BreadcrumbsMixin, CreateView):
    db = db
    model = StudySubject
    template_name = "study/subject/new.html"

    def setup(self, study_id, **kwargs):
        self.planned_study_subject = _get_planned_study_subject(study_id)
        super().setup(study_id=study_id, **kwargs)

    def get_context(self):
        ctx = super().get_context()
        ctx["planned_study_subject"] = self.planned_study_subject
        return ctx

    def get_form(self, **kwargs):
        form = StudySubjectForm(
            session=db.session,
            planned_study_subject=self.planned_study_subject,
        )
        form.status.data = Status.candidate
        form.status_date.data = datetime.now()
        return form

    def url_for_redirect(self, study_id, **kwargs):
        return url_for(".index", study_id=study_id)

    def add_breadcrumbs(self, study_id, **kwargs):
        self.breadcrumbs.extend(
            Breadcrumb(url_for(".new", study_id=study_id), _("New"))
        )


def lookup_view(study_id: int, **kwargs):
    planned_study_subject = _get_planned_study_subject(study_id)
    subject = StudySubject()
    form = StudySubjectForm(
        session=db.session,
        planned_study_subject=planned_study_subject,
    )
    form.populate_obj(obj=subject)
    subjects = lookup(subject, db.session)
    return StudySubjectList.model_validate(subjects).model_dump()


class StudySubjectShowView(BreadcrumbsMixin, ShowView):
    db = db
    model = StudySubject
    template_name = "study/subject/show.html"

    def get_context(self):
        ctx = super().get_context()
        ctx["subject"] = ctx["object"]
        return ctx

    def add_breadcrumbs(self, study_id, id, **kwargs):
        self.breadcrumbs.append(
            Breadcrumb(
                url_for(".show", study_id=study_id, id=id),
                str(self.object.performing_entity),
            )
        )


class StudySubjectEditView(BreadcrumbsMixin, EditView):
    db = db
    model = StudySubject
    template_name = "study/subject/edit.html"

    def setup(self, study_id, **kwargs):
        self.planned_study_subject = _get_planned_study_subject(study_id)
        super().setup(study_id=study_id, **kwargs)

    def get_form(self, object, study_id, **kwargs):
        return StudySubjectForm(
            obj=object,
            session=db.session,
            planned_study_subject=self.planned_study_subject,
        )

    def url_for_redirect(self, study_id, id, **kwargs):
        return url_for(".show", study_id=study_id, id=id)

    def add_breadcrumbs(self, study_id, id, **kwargs):
        self.breadcrumbs.extend(
            Breadcrumb(
                url_for(".show", study_id=study_id, id=id),
                str(self.object.performing_entity),
            ),
            Breadcrumb(
                url_for(".edit", study_id=study_id, id=id),
                _("Edit"),
            ),
        )


class StudySubjectDeleteView(HTMXDeleteMixin, DeleteView):
    db = db
    model = StudySubject

    def url_for_redirect(self, study_id, **kwargs):
        return url_for(".index", study_id=study_id)


blueprint.add_url_rule("/", view_func=StudySubjectIndexView.as_view("index"))
blueprint.add_url_rule("/new", view_func=StudySubjectCreateView.as_view("new"))
blueprint.add_url_rule(
    "/lookup", view_func=lookup_view, endpoint="lookup", methods=["POST"]
)
blueprint.add_url_rule("/<id>", view_func=StudySubjectShowView.as_view("show"))
blueprint.add_url_rule("/<id>/edit", view_func=StudySubjectEditView.as_view("edit"))
blueprint.add_url_rule("/<id>", view_func=StudySubjectDeleteView.as_view("delete"))
