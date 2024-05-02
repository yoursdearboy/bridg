from typing import Callable
import panel as pn
import param

from app import utils
from app.db import Session
from umdb.person.model import Person, Sex


class Settings(param.Parameterized):
    id = param.Integer(default=None, allow_None=True)


settings = Settings()


pn.state.location.sync(settings, {"id": "id"})


def get_data(id):
    with Session() as session:
        return session.query(Person).filter_by(id=id).one()


def save_data(person):
    with Session() as session:
        session.add(person)
        session.commit()


pn.widgets.DatePicker.date_format = param.String(default="Y-m-d")


class Form(pn.viewable.Viewer):
    id = pn.widgets.StaticText(name="Id")
    sex = pn.widgets.Select(name="Sex", options=utils.enum2options(Sex))
    birth_date = pn.widgets.DatePicker(name="Birth date", date_format="d.m.Y")
    death_date = pn.widgets.DatePicker(name="Death date", date_format="d.m.Y")
    death_date_estimated_indicator = pn.widgets.Select(
        name="Death date estimated", options=utils.booleans
    )
    death_indicator = pn.widgets.Select(name="Death indicator", options=utils.booleans)
    button = pn.widgets.Button(name="Save", button_type="primary", icon="caret-right")

    def __init__(self, person: Person, handler: Callable):
        super().__init__()

        self.person = person
        self.handler = handler

        self.load()
        self.button.on_click(self.upload)

    def __panel__(self):
        return pn.Column(
            self.id,
            self.sex,
            self.birth_date,
            self.death_date,
            self.death_date_estimated_indicator,
            self.death_indicator,
            self.button,
        )

    def load(self):
        self.id.value = self.person.id
        self.sex.value = self.person.sex
        self.birth_date.value = self.person.birth_date
        self.death_date.value = self.person.death_date
        self.death_date_estimated_indicator.value = (
            self.person.death_date_estimated_indicator
        )
        self.death_indicator.value = self.person.death_indicator

    def upload(self, event):
        self.person.sex = self.sex.value
        self.person.birth_date = self.birth_date.value
        self.person.death_date = self.death_date.value
        self.person.death_date_estimated_indicator = (
            self.death_date_estimated_indicator.value
        )
        self.person.death_indicator = self.death_indicator.value

        self.handler(self.person)


view = pn.Column(Form(person=get_data(settings.id), handler=save_data))

view.servable()
