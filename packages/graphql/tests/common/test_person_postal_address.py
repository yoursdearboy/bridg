from uuid import UUID

from syrupy.matchers import path_type

from bridg.alchemy.factory import PersonFactory, PersonPostalAddressFactory
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from ..factory import PersonPostalAddressInputFactory
from ..utils import process_input


def test_person_postal_address_query(context: Context, snapshot_json):
    person = PersonFactory.create_sync(
        postal_address=PersonPostalAddressFactory.batch(2, street="Test street"),
    )

    query = """
        query($id: ID!) {
            Person(id: $id) {
                id
                postalAddress {
                    use
                    street
                    building
                    country
                    municipality
                    state
                    zip
                }
            }
        }
    """

    result = schema.execute_sync(query, process_input(dict(id=person.id)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_person_postal_address_create(context: Context, snapshot_json):
    person = PersonFactory.create_sync()

    query = """
        mutation($input: PersonPostalAddressInput!) {
            PersonPostalAddressCreate(input: $input) {
                id
                use
                street
                building
                country
                municipality
                state
                zip
            }
        }
    """
    input = PersonPostalAddressInputFactory.build(
        street="Test street",
        person_id=person.id,
    )

    result = schema.execute_sync(query, process_input(dict(input=input)), context_value=context)
    assert result.errors is None

    session = context.session
    session.refresh(person)

    state = [{k: v for k, v in ad.__dict__.items() if k != "_sa_instance_state"} for ad in person.postal_address]
    assert state == snapshot_json(matcher=path_type({r".*id$": (UUID,)}, regex=True))
