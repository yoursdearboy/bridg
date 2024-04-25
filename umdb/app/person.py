from tokenize import Name
from fastapi import Depends
from nicegui import ui

import umdb.person.model as model
import umdb.person.schema as schema

from umdb.app import layout
from umdb.app.commons import get_db


def grid(data):
    grid = ui.aggrid(
        {
            "columnDefs": [
                {"headerName": "ID", "field": "id"},
                {"headerName": "Family Name", "field": "primary_name.family"},
                {"headerName": "Given Name", "field": "primary_name.given"},
                {"headerName": "Patronymic", "field": "primary_name.patronymic"},
                {"headerName": "Birth date", "field": "birth_date"},
            ],
            "rowData": data,
        }
    )

    grid.on("cellClicked", lambda e: ui.navigate.to(link_show(e.args["data"]["id"])))

    return grid


@ui.page("/persons/")
def index(db=Depends(get_db)):
    persons = db.query(model.Person).all()
    data = [schema.Person.model_validate(p).model_dump() for p in persons]
    layout.header(layout.nav)
    grid(data)


def link_show(id: int):
    return "/persons/%s" % id


def format_safe(date, format):
    if date is None:
        return "-"
    return date.strftime(format)


def link_button(*args, **kwargs):
    ui.link(*args, **kwargs).classes(
        "bg-blue-500 text-white py-2 px-4 rounded no-underline"
    )


@ui.page("/persons/{id}")
def show(id: int, db=Depends(get_db)):
    person = db.query(model.Person).filter_by(id=id).one()

    layout.header(layout.nav)

    ui.label("Id is %s" % id)
    ui.label("Birth day is %s" % format_safe(person.birth_date, "%d.%m.%Y"))
    link_button("Edit", link_edit(id))


def link_edit(id: int):
    return "/persons/%s/edit" % id


def edit_name(name):
    with ui.row():
        family_name = ui.input("Family")
        family_name.bind_value(name, "family")

        given_name = ui.input("Given")
        given_name.bind_value(name, "given")

        patronymic = ui.input("Patronymic")
        patronymic.bind_value(name, "patronymic")


def edit_person(person):
    birth_date = ui.input("Birth date")
    birth_date.bind_value(person, "birth_date")


@ui.page("/persons/{id}/edit")
def edit(id: int, db=Depends(get_db)):
    person = db.query(model.Person).filter_by(id=id).one()

    if person.primary_name is None:
        name = model.Name()
        person.names.append(name)
    else:
        name = person.primary_name

    layout.header(layout.nav)
    link_button("Back", link_show(id))
    edit_name(name)
    edit_person(person)

    def save():
        db.add(person)
        db.commit()

    def redirect():
        ui.navigate.to(link_show(id))

    def handler(_):
        save()
        redirect()

    ui.button("Save", on_click=handler)
