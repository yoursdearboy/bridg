from flask import Blueprint, redirect, url_for
from flask_babel import lazy_gettext as _
from flask_wtf import FlaskForm
from wtforms import StringField

from umdb import StudyProtocol, StudyProtocolVersion
from web.db import db
from web.views import CreateView, EditView, ShowView

blueprint = Blueprint("protocol", __name__, url_prefix="/protocol")


class ShowProtocolView(ShowView):
    db = db
    model = StudyProtocol
    template_name = "study/protocol/show.html"

    def get_query(self, study_id, **kwargs):
        return self.db.session.query(self.model).filter_by(planned_study_id=study_id)

    def get(self, study_id, **kwargs):
        if self.object is None:
            return redirect(url_for(".new", study_id=study_id))
        return super().get(**kwargs)


class CreateProtocolView(CreateView):
    db = db
    form_class = FlaskForm
    model = StudyProtocol
    template_name = "study/protocol/new.html"

    def get_object(self, study_id, **kwargs):
        return self.model(planned_study_id=study_id)

    def url_for_redirect(self, study_id, **kwargs):
        return url_for(".show", study_id=study_id)


class ProtocolVersionForm(FlaskForm):
    acronym = StringField(_("Acronym"))


class CreateProtocolVersionView(CreateView):
    db = db
    form_class = ProtocolVersionForm
    model = StudyProtocolVersion
    template_name = "study/protocol/version/form.html"

    def get_object(self, study_id, **kwargs):
        protocol = (
            self.db.session.query(StudyProtocol)
            .filter_by(planned_study_id=study_id)
            .one_or_none()
        )
        if protocol is None:
            raise ValueError("No protocol")
        return self.model(versioned_study_protocol=protocol)

    def url_for_redirect(self, study_id, **kwargs):
        return url_for(".show", study_id=study_id)


class EditProtocolVersionView(EditView):
    db = db
    form_class = ProtocolVersionForm
    model = StudyProtocolVersion
    template_name = "study/protocol/version/form.html"

    def url_for_redirect(self, study_id, **kwargs):
        return url_for(".show", study_id=study_id)


blueprint.add_url_rule("/", view_func=ShowProtocolView.as_view("show"))
blueprint.add_url_rule("/new", view_func=CreateProtocolView.as_view("new"))
blueprint.add_url_rule(
    "/versions/new", view_func=CreateProtocolVersionView.as_view("new_version")
)
blueprint.add_url_rule(
    "/versions/<id>/edit", view_func=EditProtocolVersionView.as_view("edit_version")
)
