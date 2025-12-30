from polyfactory import Ignore

from bridg.alchemy.common import Person

from ..base import BaseFactory


class PersonFactory(BaseFactory[Person]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    type = Ignore()
    # administrative_gender_code
    # birth_date
    death_date = None
    death_date_estimated_indicator = None
    death_indicator = False

    # name
    performed_healthcare_provider = Ignore()
    # postal_address
    # telecom_address
