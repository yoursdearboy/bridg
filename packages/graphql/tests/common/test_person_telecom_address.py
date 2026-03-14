from uuid import UUID

from syrupy.matchers import path_type

from bridg.alchemy import PersonTelecommunicationAddress
from bridg.alchemy.factory import PersonFactory, PersonTelecommunicationAddressFactory
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from ..factory import TelecommunicationAddressInputFactory
from ..utils import process_input


def test_person_telecommunication_address_query(context: Context, snapshot_json):
    person = PersonFactory.create_sync(
        telecom_address=PersonTelecommunicationAddressFactory.batch(2, address="Test address"),
    )

    query = """
        query($id: ID!) {
            Person(id: $id) {
                id
                telecomAddress {
                    use
                    scheme
                    address
                }
            }
        }
    """

    result = schema.execute_sync(query, process_input(dict(id=person.id)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_person_telecommunication_address_create(context: Context, snapshot_json):
    person = PersonFactory.create_sync()

    query = """
        mutation($personId: ID!, $input: TelecommunicationAddressInput!) {
            PersonTelecommunicationAddressCreate(personId: $personId, input: $input) {
                id
                use
                scheme
                address
            }
        }
    """
    input = TelecommunicationAddressInputFactory.build(address="Test address")

    result = schema.execute_sync(query, process_input(dict(person_id=person.id, input=input)), context_value=context)
    assert result.errors is None

    session = context.session
    session.refresh(person)

    state = [{k: v for k, v in ad.__dict__.items() if k != "_sa_instance_state"} for ad in person.telecom_address]
    assert state == snapshot_json(matcher=path_type({r".*id$": (UUID,)}, regex=True))


def test_person_telecommunication_address_delete(context: Context, snapshot_json):
    session = context.session

    person = PersonFactory.create_sync(telecom_address=PersonTelecommunicationAddressFactory.batch(1))
    tel = person.telecom_address[0]

    query = """
        mutation($id: ID!) {
            PersonTelecommunicationAddressDelete(id: $id)
        }
    """

    result = schema.execute_sync(query, process_input(dict(id=tel.id)), context_value=context)
    assert result.errors is None
    assert person.telecom_address == []
    assert session.get(PersonTelecommunicationAddress, tel.id) is None
