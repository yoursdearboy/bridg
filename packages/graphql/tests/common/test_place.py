from syrupy.matchers import path_type

from bridg.alchemy.factory import PlaceFactory
from bridg.graphql.context import Context
from bridg.graphql.schema import schema


def test_place_list(context: Context, snapshot_json):
    PlaceFactory.create_batch_sync(3)
    query = """
        query {
            PlaceList {
                id
                primaryName {
                    value
                }
                typeCode
            }
        }
    """
    result = schema.execute_sync(query, context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
