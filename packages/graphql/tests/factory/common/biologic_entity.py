from polyfactory import Ignore, Use
from strawberry import Some

from bridg.graphql.schema import BiologicEntityInput

from ..base import BaseFactory
from ..maybe import make_some


class BiologicEntityInputFactory(BaseFactory[BiologicEntityInput]):
    id = None
    # administrative_gender_code
    birth_date = Use(make_some(lambda: BaseFactory.__faker__.date_this_century(after_today=True)))
    death_date = None
    death_date_estimated_indicator = None
    death_indicator = Some(False)

    identifier = Ignore()
    name = Ignore()
