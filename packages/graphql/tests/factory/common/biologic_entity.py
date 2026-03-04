from polyfactory import Ignore, Use
from strawberry import Some

from bridg.graphql.common import BiologicEntityInput, BiologicEntityNameInput

from ..base import BaseFactory
from ..maybe import make_some


class BiologicEntityInputFactory(BaseFactory[BiologicEntityInput]):
    id = Use(make_some(BaseFactory.__faker__.uuid4))
    # administrative_gender_code
    birth_date = Use(make_some(lambda: BaseFactory.__faker__.date_this_century(after_today=True)))
    death_date = None
    death_date_estimated_indicator = None
    death_indicator = Some(False)

    identifier = Ignore()
    name = Ignore()


class BiologicEntityNameInputFactory(BaseFactory[BiologicEntityNameInput]):
    id = None
    use = None
    family = Use(make_some(BaseFactory.__faker__.last_name))
    given = Use(make_some(BaseFactory.__faker__.first_name))
    middle = None
    patronymic = None
    prefix = None
    suffix = None
