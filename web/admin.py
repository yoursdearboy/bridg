from flask_admin import Admin

from umdb.person import Name, Person

from .admin_view import MyModelView
from .db import db

admin = Admin(name="umdb", template_mode="bootstrap3")


class PersonView(MyModelView):
    column_list = [
        "id",
        "primary_name",
        "administrative_gender",
        "birth_date",
        "death_date",
        "death_date_estimated_indicator",
        "death_indicator",
    ]
    form_excluded_columns = ["type", "primary_name"]
    inline_models = [Name]


admin.add_view(PersonView(Person, db.session))
