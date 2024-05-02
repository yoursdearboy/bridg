import pandas as pd
import panel as pn

from app.db import Session
from umdb.person.model import Person, primary_names


def get_data():
    with Session() as session:
        query = session.query(
            Person.id,
            primary_names.c.family,
            primary_names.c.given,
            primary_names.c.middle,
            primary_names.c.patronymic,
            Person.sex,
            Person.birth_date,
            Person.death_date,
            Person.death_indicator,
        ).join(primary_names)
        df = pd.read_sql(query.statement, query.session.bind)
        return df


table = pn.widgets.Tabulator(
    get_data(),
    buttons={"edit": "<a href='/edit?id=1'><i class='fa fa-print'></i></a>"},
    disabled=True,
    layout="fit_data_fill",
    sizing_mode="stretch_width",
    show_index=False,
    theme="bootstrap",
    titles={
        "id": "ID",
        "family": "Family",
        "given": "Given",
        "middle": "Middle",
        "patronymic": "Patronymic",
        "sex": "Sex",
        "birth_date": "Birth date",
        "death_date": "Death date",
        "death_indicator": "Dead",
    },
)

view = pn.Column(
    pn.widgets.Button(name="New", button_type="primary"),
    table,
    sizing_mode="stretch_width",
)

view.servable()
