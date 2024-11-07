from flask import Blueprint, url_for
from flask_babel import lazy_gettext as _

from bridg import Name
from web.breadcrumbs import Breadcrumb
from web.db import db
from web.views import (
    BreadcrumbsMixin,
    CreateView,
    DeleteView,
    EditView,
    HTMXDeleteMixin,
)

from .form import NameForm

blueprint = Blueprint("name", __name__, url_prefix="/name")


class NameCreateView(BreadcrumbsMixin, CreateView):
    db = db
    model = Name
    form_class = NameForm
    template_name = "person/name/edit.html"

    def get_object(self, person_id, **kwargs):
        return Name(biologic_entity_id=person_id)

    def url_for_redirect(self, person_id, **kwargs):
        return url_for("person.show", id=person_id)

    def add_breadcrumbs(self, person_id, **kwargs):
        self.breadcrumbs.extend(
            Breadcrumb(url_for(".new", person_id=person_id), _("New"))
        )


class NameEditView(BreadcrumbsMixin, EditView):
    db = db
    model = Name
    form_class = NameForm
    template_name = "person/name/edit.html"

    def url_for_redirect(self, person_id, **kwargs):
        return url_for("person.show", id=person_id)

    def add_breadcrumbs(self, person_id, id, **kwargs):
        self.breadcrumbs.extend(
            Breadcrumb(url_for(".edit", person_id=person_id, id=id), _("Rename"))
        )


class NameDeleteView(HTMXDeleteMixin, DeleteView):
    db = db
    model = Name

    def url_for_redirect(self, person_id, **kwargs):
        return url_for("person.show", id=person_id)


blueprint.add_url_rule("/new", view_func=NameCreateView.as_view("new"))
blueprint.add_url_rule("/<id>/edit", view_func=NameEditView.as_view("edit"))
blueprint.add_url_rule("/<id>", view_func=NameDeleteView.as_view("delete"))
