from flask import Blueprint, abort, redirect, render_template, request, url_for
from flask_babel import lazy_gettext as _

from umdb import Person
from web.breadcrumbs import Breadcrumb, breadcrumbs
from web.db import db

from . import name
from .form import PersonForm

blueprint = Blueprint("person", __name__, url_prefix="/persons")

blueprint.register_blueprint(
    name.blueprint, url_prefix=f"/<int:person_id>/{name.blueprint.url_prefix}"
)


@blueprint.before_request
def setup_studies_breadcrumb():
    breadcrumbs.append(Breadcrumb("#", _("Persons")))

    if request.view_args and "person_id" in request.view_args:
        person_id = request.view_args["person_id"]
        person = db.session.query(Person).filter_by(id=person_id).one_or_none()
        if person:
            breadcrumbs.append(
                Breadcrumb(url_for("person.show", id=person_id), str(person))
            )


@blueprint.route("/<id>")
def show(id: int):
    person = db.session.query(Person).filter_by(id=id).one_or_none()
    if not person:
        abort(404)
    breadcrumbs.append(Breadcrumb(url_for(".show", id=id), person))
    return render_template("person/show.html", person=person)


@blueprint.route("/<id>/edit", methods=["GET", "POST"])
def edit(id: int):
    person = db.session.query(Person).filter_by(id=id).one_or_none()
    if not person:
        abort(404)

    form = PersonForm(obj=person)

    if request.method == "POST":
        if form.validate():
            form.populate_obj(person)
            db.session.add(person)
            db.session.commit()
            return redirect(url_for(".show", id=id))

    breadcrumbs.append(Breadcrumb(url_for(".show", id=id), str(person)))
    breadcrumbs.append(Breadcrumb(url_for(".edit", id=id), _("Edit")))
    return render_template("person/edit.html", form=form, person=person)
