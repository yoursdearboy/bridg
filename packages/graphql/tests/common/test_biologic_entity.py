from bridg.alchemy import PersonPostalAddress
from bridg.alchemy.factory import BiologicEntityFactory, BiologicEntityNameFactory
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from ..utils import process_input


def test_biologic_entity_name_delete(context: Context, snapshot_json):
    session = context.session

    be = BiologicEntityFactory.create_sync(name=BiologicEntityNameFactory.batch(1))
    en = be.name[0]

    query = """
        mutation($id: ID!) {
            BiologicEntityNameDelete(id: $id)
        }
    """

    result = schema.execute_sync(query, process_input(dict(id=en.id)), context_value=context)
    assert result.errors is None
    assert be.name == []
    assert session.get(PersonPostalAddress, en.id) is None
