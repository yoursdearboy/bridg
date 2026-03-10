from bridg.graphql.common import PersonTelecommunicationAddressInput

from ..datatype import TelecommunicationAddressInputFactory


class PersonTelecommunicationAddressInputFactory(
    TelecommunicationAddressInputFactory[PersonTelecommunicationAddressInput]
):
    id = None
    person_id = None
