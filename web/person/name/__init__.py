from flask import Blueprint, abort, redirect, render_template, request, url_for
from flask_babel import lazy_gettext as _
from flask_htmx import htmx

from umdb import Name
from web.breadcrumbs import Breadcrumb, breadcrumbs
from web.db import db

from .form import NameForm

blueprint = Blueprint("name", __name__, url_prefix="/name")


@blueprint.route("/new", methods=["GET", "POST"])
def new(person_id: int):
    name = Name(biologic_entity_id=person_id)

    form = NameForm(obj=name)
    action = url_for(".new", person_id=person_id)

    if request.method == "POST":
        if form.validate():
            form.populate_obj(name)
            db.session.add(name)
            db.session.commit()
            return redirect(url_for("person.show", id=person_id))

    breadcrumbs.append(Breadcrumb(url_for(".new", person_id=person_id), _("New")))

    return render_template("person/name/edit.html", form=form, action=action)


@blueprint.route("/<id>/edit", methods=["GET", "POST"])
def edit(person_id: int, id: int):
    name = db.session.query(Name).filter_by(id=id).one_or_none()
    if not name:
        abort(404)

    form = NameForm(obj=name)
    action = url_for(".edit", person_id=person_id, id=id)

    if request.method == "POST":
        if form.validate():
            form.populate_obj(name)
            db.session.add(name)
            db.session.commit()
            return redirect(url_for("person.show", id=person_id))

    breadcrumbs.append(
        Breadcrumb(url_for(".edit", person_id=person_id, id=id), _("Rename"))
    )
    return render_template("person/name/edit.html", form=form, action=action, name=name)


@blueprint.route("<id>/delete", methods=["DELETE"])
def delete(person_id: int, id: int):
    name = db.session.query(Name).filter_by(id=id).one_or_none()

    if not name:
        abort(404)

    db.session.delete(name)
    db.session.commit()

    res = redirect(url_for("person.show", id=person_id))
    if htmx:
        res.headers["HX-Redirect"] = res.headers.pop("Location")

    return res
