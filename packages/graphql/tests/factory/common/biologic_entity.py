from polyfactory import Ignore, Use

from bridg.graphql.common import BiologicEntityInput, BiologicEntityNameInput

from ..base import BaseFactory


class BiologicEntityInputFactory(BaseFactory[BiologicEntityInput]):
    id = Use(BaseFactory.__faker__.uuid4)
    # administrative_gender_code = Use(lambda: BaseFactory.__faker__.enum(AdministrativeGender))
    birth_date = Use(lambda: BaseFactory.__faker__.date_this_century(after_today=True))
    death_date = None
    death_date_estimated_indicator = None
    death_indicator = False

    identifier = Ignore()
    name = Ignore()


class BiologicEntityNameInputFactory(BaseFactory[BiologicEntityNameInput]):
    id = None
    use = None
    family = Use(BaseFactory.__faker__.last_name)
    given = Use(BaseFactory.__faker__.first_name)
    middle = None
    patronymic = None
    prefix = None
    suffix = None
