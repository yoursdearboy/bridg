from flask import Blueprint, request, url_for
from flask_babel import lazy_gettext as _

from umdb import Person
from web.breadcrumbs import Breadcrumb, breadcrumbs
from web.db import db
from web.views import BreadcrumbsMixin, EditView, ShowView

from . import name
from .form import PersonForm

blueprint = Blueprint("person", __name__, url_prefix="/persons")

blueprint.register_blueprint(
    name.blueprint, url_prefix=f"/<int:person_id>/{name.blueprint.url_prefix}"
)


@blueprint.before_request
def setup_studies_breadcrumb():
    breadcrumbs.append(Breadcrumb(url_for("person.index"), _("Persons")))

    if request.view_args and "person_id" in request.view_args:
        person_id = request.view_args["person_id"]
        person = db.session.query(Person).filter_by(id=person_id).one_or_none()
        if person:
            breadcrumbs.append(
                Breadcrumb(url_for("person.show", id=person_id), str(person))
            )


class PersonShowView(BreadcrumbsMixin, ShowView):
    db = db
    model = Person
    template_name = "person/show.html"

    def get_context(self):
        ctx = super().get_context()
        ctx["person"] = ctx["object"]
        return ctx

    def add_breadcrumbs(self, id, **kwargs):
        self.breadcrumbs.extend(Breadcrumb(url_for(".show", id=id), self.object))


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

    def add_breadcrumbs(self, id, **kwargs):
        self.breadcrumbs.extend(
            Breadcrumb(url_for(".show", id=id), self.object),
            Breadcrumb(url_for(".edit", id=id), _("Edit")),
        )


blueprint.add_url_rule("/<id>", view_func=PersonShowView.as_view("show"))
blueprint.add_url_rule("/<id>/edit", view_func=PersonEditView.as_view("edit"))
