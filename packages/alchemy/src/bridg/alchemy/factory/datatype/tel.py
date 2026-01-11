from polyfactory import Use

from bridg.alchemy import TelecommunicationAddress

from ..base import BaseFactory


class TelecommunicationAddressFactory[T: TelecommunicationAddress](BaseFactory[T]):
    __is_base_factory__ = True

    use = None
    scheme = "tel"
    address = Use(BaseFactory.__faker__.phone_number)
