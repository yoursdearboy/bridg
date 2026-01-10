from polyfactory import Ignore, Use

from bridg.api.model import PersonPostalAddressData, PersonTelecommunicationAddressData

from ..base import BaseFactory


class PersonPostalAddressDataFactory(BaseFactory[PersonPostalAddressData]):
    use = Ignore()


class PersonTelecommunicationAddressDataFactory(BaseFactory[PersonTelecommunicationAddressData]):
    use = Ignore()
    scheme = "tel"
    address = Use(BaseFactory.__faker__.phone_number)
