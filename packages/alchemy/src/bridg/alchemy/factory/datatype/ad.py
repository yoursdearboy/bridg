from polyfactory import Use

from bridg.alchemy import PostalAddress

from ..base import BaseFactory


class PostalAddressFactory[T: PostalAddress](BaseFactory[T]):
    __is_base_factory__ = True

    use = None
    street = Use(BaseFactory.__faker__.street_name)
    building = Use(BaseFactory.__faker__.building_number)
    country = Use(BaseFactory.__faker__.country)
    municipality = None
    state = Use(BaseFactory.__faker__.state)
    zip = Use(BaseFactory.__faker__.zipcode)
