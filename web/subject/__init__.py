from datetime import datetime

from flask import Blueprint, url_for
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

from .form import EditStudySubjectForm, NewStudySubjectForm
from .lookup import lookup
from .schema import StudySubjectList, StudySubjectLookupList

blueprint = Blueprint("subject", __name__, url_prefix="/space/<space_id>/subjects")


class SubjectIndexView(BreadcrumbsMixin, IndexDataTableView):
    model = StudySubject
    schema = StudySubjectList
    template_name = "subject/index.html"

    def setup(self, space_id: int, **kwargs):
        self.study_protocol_version = _get_study_protocol_version(space_id)
        self.planned_study_subject = _get_planned_study_subject(self.study_protocol_version)
        super().setup(space_id=space_id, **kwargs)

    def get_context(self):
        ctx = super().get_context()
        ctx["planned_study_subject"] = self.planned_study_subject
        return ctx

    def get_query(self, **kwargs):
        return (
            db.session.query(StudySubject)
            .join(StudySubject.assigned_study_subject_protocol_version_relationship)
            .join(StudySubjectProtocolVersionRelationship.assigning_study_site_protocol_version_relationship)
            .filter(StudySiteProtocolVersionRelationship.executed_study_protocol_version == self.study_protocol_version)
        )

    def setup_breadcrumbs(self, **kwargs):
        self.add_breadcrumb(".index", _("Subjects"))


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


class SubjectCreateView(BreadcrumbsMixin, CreateView):
    db = db
    template_name = "subject/new.html"

    def setup(self, space_id: int, **kwargs):
        self.study_protocol_version = _get_study_protocol_version(space_id)
        self.planned_study_subject = _get_planned_study_subject(self.study_protocol_version)
        super().setup(space_id=space_id, **kwargs)

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
        return NewStudySubjectForm(
            obj=object,
            performing=_get_performing(self.planned_study_subject),
            assigned_study_site_protocol_version_relationship_query=(
                _get_study_site_protocol_version_relationship(self.study_protocol_version)
            ),
        )

    def url_for_redirect(self, space_id, **kwargs):
        return url_for(".index", space_id=space_id)

    def setup_breadcrumbs(self, **kwargs):
        self.add_breadcrumb(".index", _("Subjects"))
        self.add_breadcrumb(".new", _("New"))


def lookup_view(space_id: int, **kwargs):
    study_protcol_version = _get_study_protocol_version(space_id)
    planned_study_subject = _get_planned_study_subject(study_protcol_version)
    subject = construct_subject(planned_study_subject)
    form = NewStudySubjectForm(
        performing=_get_performing(planned_study_subject),
        assigned_study_site_protocol_version_relationship_query=(
            _get_study_site_protocol_version_relationship(study_protcol_version)
        ),
    )
    form.populate_obj(obj=subject)
    subjects = lookup(subject, db.session)
    return StudySubjectLookupList.model_validate(subjects).model_dump()


class SubjectShowView(BreadcrumbsMixin, ShowView):
    db = db
    model = StudySubject
    template_name = "subject/show.html"

    def get_context(self):
        ctx = super().get_context()
        ctx["subject"] = ctx["object"]
        return ctx

    def setup_breadcrumbs(self, **kwargs):
        self.add_breadcrumb(".index", _("Subjects"))
        self.add_breadcrumb(".show", self.object.performing_entity)


class SubjectEditView(BreadcrumbsMixin, EditView):
    db = db
    model = StudySubject
    template_name = "subject/edit.html"

    def setup(self, space_id: int, **kwargs):
        self.study_protocol_version = _get_study_protocol_version(space_id)
        self.planned_study_subject = _get_planned_study_subject(self.study_protocol_version)
        super().setup(space_id=space_id, **kwargs)

    def get_form(self, object, **kwargs):
        return EditStudySubjectForm(
            obj=object,
            assigned_study_site_protocol_version_relationship_query=(
                _get_study_site_protocol_version_relationship(self.study_protocol_version)
            ),
        )

    def url_for_redirect(self, space_id, id, **kwargs):
        return url_for(".show", space_id=space_id, id=id)

    def setup_breadcrumbs(self, **kwargs):
        self.add_breadcrumb(".show", self.object.performing_entity)
        self.add_breadcrumb(".edit", _("Edit"))


class SubjectDeleteView(HTMXDeleteMixin, DeleteView):
    db = db
    model = StudySubject

    def url_for_redirect(self, space_id, **kwargs):
        return url_for(".index", space_id=space_id)


blueprint.add_url_rule("/", view_func=SubjectIndexView.as_view("index"))
blueprint.add_url_rule("/new", view_func=SubjectCreateView.as_view("new"))
blueprint.add_url_rule("/lookup", view_func=lookup_view, endpoint="lookup", methods=["POST"])
blueprint.add_url_rule("/<id>", view_func=SubjectShowView.as_view("show"))
blueprint.add_url_rule("/<id>/edit", view_func=SubjectEditView.as_view("edit"))
blueprint.add_url_rule("/<id>", view_func=SubjectDeleteView.as_view("delete"))
