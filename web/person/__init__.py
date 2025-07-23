from flask import Blueprint, url_for
from flask_babel import lazy_gettext as _

from bridg import Person
from web.db import db
from web.views import BreadcrumbsMixin, EditView, ShowView

from . import name, postal_address, telecom_address
from .form import PersonForm

blueprint = Blueprint("person", __name__, url_prefix="/persons")


class PersonShowView(BreadcrumbsMixin, ShowView):
    db = db
    model = Person
    template_name = "person/show.html"

    def get_context(self):
        ctx = super().get_context()
        ctx["person"] = ctx["object"]
        return ctx

    def setup_breadcrumbs(self, **kwargs):
        self.add_breadcrumb(None, _("Persons"))
        self.add_breadcrumb(".show", str(self.object))


class PersonEditView(BreadcrumbsMixin, EditView):
    db = db
    model = Person
    form_class = PersonForm
    template_name = "person/edit.html"

    def get_context(self):
        ctx = super().get_context()
        ctx["person"] = ctx["object"]
        return ctx

    def url_for_redirect(self, id, **kwargs):
        return url_for(".show", id=id)

    def setup_breadcrumbs(self, **kwargs):
        self.add_breadcrumb(None, _("Persons"))
        self.add_breadcrumb(".show", str(self.object))
        self.add_breadcrumb(".edit", _("Edit"))


blueprint.add_url_rule("/<uuid:id>", view_func=PersonShowView.as_view("show"))
blueprint.add_url_rule("/<uuid:id>/edit", view_func=PersonEditView.as_view("edit"))
blueprint.register_blueprint(
    name.blueprint, url_prefix=f"/<uuid:person_id>/{name.blueprint.url_prefix}")
blueprint.register_blueprint(
    postal_address.blueprint, url_prefix=f"/<uuid:person_id>/{postal_address.blueprint.url_prefix}")
blueprint.register_blueprint(
    telecom_address.blueprint, url_prefix=f"/<uuid:person_id>/{telecom_address.blueprint.url_prefix}")
