from flask import Blueprint, url_for
from flask_babel import lazy_gettext as _
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms_alchemy import QuerySelectField

from bridg import DefinedActivity, PerformedActivity, StudySubject

from ...db import db
from ...fields import DateTimeField
from ...space import SpaceMixin
from ...views import BreadcrumbsMixin, ContextMixin, CreateView, DeleteView, EditView, HTMXDeleteMixin, SQLAlchemyMixin

blueprint = Blueprint("activity", __name__, url_prefix="/activity")


class SubjectMixin(ContextMixin, SQLAlchemyMixin):
    def _get_subject(self, id: int):
        return self.db.session.query(StudySubject).filter_by(id=id).one()

    def setup(self, subject_id: int, **kwargs):
        self.subject = self._get_subject(id=subject_id)
        super().setup(subject_id=subject_id, **kwargs)

    def get_context(self):
        ctx = super().get_context()
        ctx["subject"] = self.subject
        return ctx


class ActivityForm(FlaskForm):
    reason_code = StringField(_("Reason"))
    containing_epoch = QuerySelectField(_("Epoch"), allow_blank=True)
    context_for_study_site = QuerySelectField(_("Study site"), allow_blank=True)
    comment = TextAreaField(_("Comment"))
    status_code = StringField(_("Status"))
    status_date = DateTimeField(_("Status date"))


class ActivityCreateView(SubjectMixin, SpaceMixin, BreadcrumbsMixin, CreateView[ActivityForm]):
    db = db
    model = PerformedActivity
    form_class = ActivityForm
    template_name = "subject/activity/new.html"

    def _get_defined_activity(self, id: int):
        return self.db.session.query(DefinedActivity).filter_by(id=id).one()

    def setup(self, defined_activity_id, **kwargs):
        self.defined_activity = self._get_defined_activity(defined_activity_id)
        super().setup(defined_activity_id=defined_activity_id, **kwargs)

    def get_context(self):
        ctx = super().get_context()
        ctx["defined_activity"] = self.defined_activity
        return ctx

    def get_form(self, **kwargs):
        form = super().get_form(**kwargs)
        form.context_for_study_site.query = self.study_protocol_version.executing_study_site
        form.containing_epoch.query = self.study_protocol_version.subdividing_epoch
        return form

    def get_data(self, form, **kwargs):
        data = super().get_data(form, **kwargs)
        data["executing_study_protocol_version"] = self.study_protocol_version
        data["instantiated_defined_activity"] = self.defined_activity
        data["involved_subject"] = self.subject
        data["using_project"] = self.study_protocol_version.versioned_study_protocol.planned_study
        return data

    def setup_breadcrumbs(self, subject_id, **kwargs):
        self.add_breadcrumb("subject.index", _("Subjects"))
        self.add_breadcrumb("subject.show", str(self.subject.performing_entity), id=subject_id)
        self.add_breadcrumb(".new", _("New activity"))

    def url_for_redirect(self, space_id, subject_id, **kwargs):
        return url_for("subject.show", space_id=space_id, id=subject_id)


class ActivityEditView(SubjectMixin, SpaceMixin, BreadcrumbsMixin, EditView[ActivityForm, PerformedActivity]):
    db = db
    model = PerformedActivity
    form_class = ActivityForm
    template_name = "subject/activity/edit.html"

    def get_form(self, **kwargs):
        form = super().get_form(**kwargs)
        form.context_for_study_site.query = self.study_protocol_version.executing_study_site
        form.containing_epoch.query = self.study_protocol_version.subdividing_epoch
        return form

    def get_context(self):
        ctx = super().get_context()
        ctx["defined_activity"] = self.object.instantiated_defined_activity
        return ctx

    def setup_breadcrumbs(self, subject_id, **kwargs):
        self.add_breadcrumb("subject.index", _("Subjects"))
        self.add_breadcrumb("subject.show", str(self.subject.performing_entity), id=subject_id)
        self.add_breadcrumb(".edit", _("Edit activity"))

    def url_for_redirect(self, space_id, subject_id, **kwargs):
        return url_for("subject.show", id=subject_id, space_id=space_id)


class ActivityDeleteView(HTMXDeleteMixin, DeleteView):
    db = db
    model = PerformedActivity

    def url_for_redirect(self, space_id, subject_id, **kwargs):
        return url_for("subject.show", space_id=space_id, id=subject_id)


blueprint.add_url_rule("/new", view_func=ActivityCreateView.as_view("new"))
blueprint.add_url_rule("/<id>/edit", view_func=ActivityEditView.as_view("edit"))
blueprint.add_url_rule("/<id>", view_func=ActivityDeleteView.as_view("delete"))
