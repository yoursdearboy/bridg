from polyfactory import Use

from bridg.graphql.schema import URLInput

from ..base import BaseFactory
from ..maybe import make_some


class URLInputFactoryy[T: URLInput](BaseFactory[T]):
    __is_base_factory__ = True

    scheme = "tel"
    address = Use(make_some(BaseFactory.__faker__.phone_number))
