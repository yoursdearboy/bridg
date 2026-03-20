from bridg.alchemy.factory import (
    ConceptDescriptorFactory,
)
from bridg.graphql.context import Context
from bridg.graphql.schema import schema


def test_code_system(context: Context, snapshot_json):
    ConceptDescriptorFactory.create_batch_sync(5, code_system="test")
    ConceptDescriptorFactory.create_batch_sync(5, code_system="rest")

    query = """
        query {
            CodeSystem(codeSystem: "test")
        }
    """

    result = schema.execute_sync(query, context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json()
