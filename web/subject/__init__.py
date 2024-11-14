from flask import Blueprint, url_for
from flask_babel import lazy_gettext as _
from toolz.curried import assoc_in, dissoc, get, update_in

from bridg import (
    Person,
    PlannedStudySubject,
    StudyProtocolVersion,
    StudySiteProtocolVersionRelationship,
    StudySubject,
    StudySubjectProtocolVersionRelationship,
)
from web.db import db
from web.misc import remove_blank_dicts
from web.views import (
    BaseView,
    BreadcrumbsMixin,
    ContextMixin,
    ConverterMixin,
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


class SpaceMixin(ContextMixin):
    def setup(self, space_id: int, **kwargs):
        self.study_protocol_version = _get_study_protocol_version(space_id)
        self.planned_study_subject = _get_planned_study_subject(self.study_protocol_version)
        super().setup(space_id=space_id, **kwargs)

    def get_context(self):
        ctx = super().get_context()
        ctx["planned_study_subject"] = self.planned_study_subject
        return ctx


class SubjectIndexView(SpaceMixin, BreadcrumbsMixin, IndexDataTableView):
    model = StudySubject
    schema = StudySubjectList
    template_name = "subject/index.html"

    def get_query(self, **kwargs):
        return (
            db.session.query(StudySubject)
            .join(StudySubject.assigned_study_subject_protocol_version_relationship)
            .join(StudySubjectProtocolVersionRelationship.assigning_study_site_protocol_version_relationship)
            .filter(StudySiteProtocolVersionRelationship.executed_study_protocol_version == self.study_protocol_version)
        )

    def setup_breadcrumbs(self, **kwargs):
        self.add_breadcrumb(".index", _("Subjects"))


class SubjectCreateView(SpaceMixin, BreadcrumbsMixin, CreateView):
    db = db
    model = StudySubject
    template_name = "subject/new.html"

    def get_form(self, object, **kwargs):
        return NewStudySubjectForm(
            obj=object,
            performing=_get_performing(self.planned_study_subject),
            assigned_study_site_protocol_version_relationship_query=(
                _get_study_site_protocol_version_relationship(self.study_protocol_version)
            ),
        )

    def get_data(self, form, **kwargs):
        data = form.data

        if get("performing_biologic_entity_id", data):
            data = dissoc(data, "performing_biologic_entity")
        if not self.planned_study_subject.performing_biologic_entity:
            data = dissoc(data, "performing_biologic_entity")
        if pbe := self.planned_study_subject.performing_biologic_entity:
            data = assoc_in(data, ["performing_biologic_entity", "type"], pbe.type)
        if isinstance(self.planned_study_subject.performing_biologic_entity, Person):
            data = update_in(data, ["performing_biologic_entity", "postal_address"], remove_blank_dicts)
        if get("performing_organization_id", data):
            data = dissoc(data, "performing_organization")
        if not self.planned_study_subject.performing_organization:
            data = dissoc(data, "performing_organization")
        return data

    def url_for_redirect(self, space_id, **kwargs):
        return url_for(".index", space_id=space_id)

    def setup_breadcrumbs(self, **kwargs):
        self.add_breadcrumb(".index", _("Subjects"))
        self.add_breadcrumb(".new", _("New"))


class SubjectLookupView(SpaceMixin, ConverterMixin, BaseView):
    def get_form(self, **kwargs):
        return NewStudySubjectForm(
            performing=_get_performing(self.planned_study_subject),
            assigned_study_site_protocol_version_relationship_query=(
                _get_study_site_protocol_version_relationship(self.study_protocol_version)
            ),
        )

    def get_data(self, form, **kwargs):
        data = form.data
        if not self.planned_study_subject.performing_biologic_entity:
            data = dissoc(data, "performing_biologic_entity")
        if not self.planned_study_subject.performing_organization:
            data = dissoc(data, "performing_organization")
        return data

    def post(self, **kwargs):
        form = self.get_form(**kwargs)
        data = self.get_data(form)
        subject = self.converter.structure(data, StudySubject)
        subjects = lookup(subject, db.session)
        return StudySubjectLookupList.model_validate(subjects).model_dump()


class SubjectShowView(SpaceMixin, BreadcrumbsMixin, ShowView):
    object: StudySubject
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


class SubjectEditView(SpaceMixin, BreadcrumbsMixin, EditView):
    db = db
    model = StudySubject
    template_name = "subject/edit.html"

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
blueprint.add_url_rule("/lookup", view_func=SubjectLookupView.as_view("lookup"))
blueprint.add_url_rule("/<id>", view_func=SubjectShowView.as_view("show"))
blueprint.add_url_rule("/<id>/edit", view_func=SubjectEditView.as_view("edit"))
blueprint.add_url_rule("/<id>", view_func=SubjectDeleteView.as_view("delete"))
