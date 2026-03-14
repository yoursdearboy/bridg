from polyfactory import Ignore, Use

from bridg.alchemy import Person, PersonPostalAddress, PersonTelecommunicationAddress

from ..datatype import PostalAddressFactory, TelecommunicationAddressFactory
from .biologic_entity import BiologicEntityBaseFactory


class PersonPostalAddressFactory(PostalAddressFactory[PersonPostalAddress]):
    id = Ignore()
    person_id = Ignore()
    person = Ignore()


class PersonTelecommunicationAddressFactory(TelecommunicationAddressFactory[PersonTelecommunicationAddress]):
    id = Ignore()
    person_id = Ignore()
    person = Ignore()


class PersonFactory(BiologicEntityBaseFactory[Person]):
    __set_as_default_factory_for_type__ = True

    performed_healthcare_provider = Ignore()
    postal_address = Use(lambda: [])
    telecom_address = Use(lambda: [])
