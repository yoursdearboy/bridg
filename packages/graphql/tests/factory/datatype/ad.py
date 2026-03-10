from polyfactory import Use

from bridg.graphql.model import PostalAddressInput

from ..base import BaseFactory
from ..maybe import make_some


class PostalAddressInputFactory(BaseFactory[PostalAddressInput]):
    # use
    street = Use(make_some(BaseFactory.__faker__.street_name))
    building = Use(make_some(BaseFactory.__faker__.building_number))
    country = Use(make_some(BaseFactory.__faker__.country))
    municipality = None
    state = Use(make_some(BaseFactory.__faker__.state))
    zip = Use(make_some(BaseFactory.__faker__.zipcode))
