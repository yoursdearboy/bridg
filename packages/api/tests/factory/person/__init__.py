import bridg
from polyfactory import Ignore

from tests.factory.base import BaseFactory


class PersonFactory(BaseFactory[bridg.Person]):
    __set_relationships__ = True

    id = Ignore()
    type = Ignore()
    # administrative_gender_code
    death_date = None
    death_date_estimated_indicator = None
    death_indicator = False
    # name
