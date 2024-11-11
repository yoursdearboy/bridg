from flask import Blueprint, url_for
from flask_babel import lazy_gettext as _
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField

from bridg.common.study import Study
from web.breadcrumbs import Breadcrumb
from web.db import db
from web.views import BreadcrumbsMixin, CreateView

blueprint = Blueprint("study", __name__, url_prefix="/studies")


class StudyForm(FlaskForm):
    name = StringField(_("Name"))
    type = StringField(_("Type"))
    description = TextAreaField(_("Description"))


class CreateStudyView(BreadcrumbsMixin, CreateView):
    db = db
    form_class = StudyForm
    model = Study
    template_name = "study/new.html"

    def url_for_redirect(self):
        return url_for(".index")

    def setup_breadcrumbs(self):
        self.breadcrumbs.extend(Breadcrumb(url_for(".new"), _("New")))


blueprint.add_url_rule("/new", view_func=CreateStudyView.as_view("new"))
