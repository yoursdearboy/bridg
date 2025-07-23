from flask import Blueprint, url_for
from flask_babel import lazy_gettext as _
from flask_wtf import FlaskForm
from wtforms_alchemy.fields import QuerySelectField

from bridg import HealthcareFacility, Organization, StudySite
from web.db import db
from web.fields import SelectBooleanField
from web.views import CreateView, DeleteView, HTMXDeleteMixin

blueprint = Blueprint("site", __name__, url_prefix="/sites")


class StudySiteForm(FlaskForm):
    lead = SelectBooleanField(_("Lead"))
    performing_healthcare_facility = QuerySelectField(
        _("Performing healthcare facility"), allow_blank=True
    )
    performing_organization = QuerySelectField(
        _("Performing organization"), allow_blank=True
    )

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.performing_healthcare_facility.query_factory = lambda: db.session.query(
            HealthcareFacility
        )
        self.performing_organization.query_factory = lambda: db.session.query(
            Organization
        )


class CreateStudySiteView(CreateView):
    db = db
    form_class = StudySiteForm
    model = StudySite
    template_name = "study/protocol/version/new_site.html"

    def url_for_redirect(self, study_id, **kwargs):
        return url_for(".show", study_id=study_id)


class DeleteStudySiteView(HTMXDeleteMixin, DeleteView):
    db = db
    model = StudySite

    def url_for_redirect(self, study_id, **kwargs):
        return url_for(".show", study_id=study_id)


blueprint.add_url_rule("/new", view_func=CreateStudySiteView.as_view("new"))
blueprint.add_url_rule("/<uuid:id>", view_func=DeleteStudySiteView.as_view("delete"))
