from uuid import UUID
from flask import Blueprint, url_for
from flask_babel import lazy_gettext as _

from bridg import EntityName, Person
from web.db import db
from web.views import BreadcrumbsMixin, ContextMixin, CreateView, DeleteView, EditView, HTMXDeleteMixin, SQLAlchemyMixin

from .form import NameForm

blueprint = Blueprint("name", __name__, url_prefix="/name")


class PersonMixin(ContextMixin, SQLAlchemyMixin):
    def setup(self, person_id: UUID, **kwargs):
        self.person = db.session.query(Person).filter_by(id=person_id).one()
        super().setup(person_id=person_id, **kwargs)

    def get_context(self):
        ctx = super().get_context()
        ctx["person"] = self.person
        return ctx


class NameCreateView(PersonMixin, BreadcrumbsMixin, CreateView):
    db = db
    model = EntityName
    form_class = NameForm
    template_name = "person/name/edit.html"

    def get_data(self, form, person_id, **kwargs):
        data = super().get_data(form, person_id=person_id, **kwargs)
        data["biologic_entity_id"] = person_id
        return data

    def url_for_redirect(self, person_id, **kwargs):
        return url_for("person.show", id=person_id)

    def setup_breadcrumbs(self, person_id, **kwargs):
        self.add_breadcrumb(None, _("Persons"))
        self.add_breadcrumb("person.show", str(self.person), id=person_id)
        self.add_breadcrumb(".new", _("Add name"))


class NameEditView(PersonMixin, BreadcrumbsMixin, EditView):
    db = db
    model = EntityName
    form_class = NameForm
    template_name = "person/name/edit.html"

    def url_for_redirect(self, person_id, **kwargs):
        return url_for("person.show", id=person_id)

    def setup_breadcrumbs(self, person_id, **kwargs):
        self.add_breadcrumb(None, _("Persons"))
        self.add_breadcrumb("person.show", str(self.object.biologic_entity), id=person_id)
        self.add_breadcrumb("person.edit", _("Rename"))


class NameDeleteView(HTMXDeleteMixin, DeleteView):
    db = db
    model = EntityName

    def url_for_redirect(self, person_id, **kwargs):
        return url_for("person.show", id=person_id)


blueprint.add_url_rule("/new", view_func=NameCreateView.as_view("new"))
blueprint.add_url_rule("/<uuid:id>/edit", view_func=NameEditView.as_view("edit"))
blueprint.add_url_rule("/<uuid:id>", view_func=NameDeleteView.as_view("delete"))
