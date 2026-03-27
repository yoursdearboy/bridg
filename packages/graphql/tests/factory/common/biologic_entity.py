from polyfactory import Ignore, Use
from strawberry import Some

from bridg.graphql.schema import BiologicEntityInput, BiologicEntityNameInput

from ..base import BaseFactory
from ..datatype import EntityNameInputFactory
from ..maybe import make_some


class BiologicEntityInputBaseFactory[T: BiologicEntityInput](BaseFactory[T]):
    __is_base_factory__ = True

    id = None
    # administrative_gender_code
    birth_date = Use(make_some(lambda: BaseFactory.__faker__.date_this_century(after_today=True)))
    death_date = None
    death_date_estimated_indicator = None
    death_indicator = Some(False)

    identifier = Ignore()
    name = Ignore()


class BiologicEntityInputFactory(BiologicEntityInputBaseFactory[BiologicEntityInput]):
    type = "biologic_entity"


class BiologicEntityNameInputFactory(EntityNameInputFactory[BiologicEntityNameInput]):
    id = None
