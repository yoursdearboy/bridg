from uuid import UUID

from syrupy.matchers import path_type

from bridg.alchemy.factory import PersonFactory, PersonTelecommunicationAddressFactory
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from ..factory import PersonTelecommunicationAddressInputFactory
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
        mutation($input: PersonTelecommunicationAddressInput!) {
            PersonTelecommunicationAddressCreate(input: $input) {
                id
                use
                scheme
                address
            }
        }
    """
    input = PersonTelecommunicationAddressInputFactory.build(
        address="Test address",
        person_id=person.id,
    )

    result = schema.execute_sync(query, process_input(dict(input=input)), context_value=context)
    assert result.errors is None

    session = context.session
    session.refresh(person)

    state = [{k: v for k, v in ad.__dict__.items() if k != "_sa_instance_state"} for ad in person.telecom_address]
    assert state == snapshot_json(matcher=path_type({r".*id$": (UUID,)}, regex=True))
