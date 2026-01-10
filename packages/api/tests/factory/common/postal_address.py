from polyfactory import Ignore

from bridg.api.model import PersonPostalAddressData

from ..base import BaseFactory


class PersonPostalAddressDataFactory(BaseFactory[PersonPostalAddressData]):
    use = Ignore()
