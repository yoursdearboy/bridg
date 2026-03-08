from bridg.graphql.common import PersonPostalAddressInput, PersonTelecommunicationAddressInput

from ..datatype import PostalAddressInputFactory, TelecommunicationAddressInputFactory


class PersonPostalAddressInputFactory(PostalAddressInputFactory[PersonPostalAddressInput]):
    id = None
    person_id = None


class PersonTelecommunicationAddressInputFactory(
    TelecommunicationAddressInputFactory[PersonTelecommunicationAddressInput]
):
    id = None
    person_id = None
