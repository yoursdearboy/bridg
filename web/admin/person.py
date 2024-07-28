from umdb.person import Name, Person

from .view import MyModelView


class PersonView(MyModelView):
    model = Person
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
