from polyfactory import Ignore

from bridg.common import Person

from ..base import BaseFactory


class PersonFactory(BaseFactory[Person]):
    __set_as_default_factory_for_type__ = True
    __set_relationships__ = True

    id = Ignore()
    type = Ignore()
    # administrative_gender_code
    death_date = None
    death_date_estimated_indicator = None
    death_indicator = False
    # name
