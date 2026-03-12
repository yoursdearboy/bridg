from syrupy.matchers import path_type

from bridg.alchemy.factory import PerformedSpecimenCollectionFactory, SpecimenFactory
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from ..utils import process_input


def test_specimen_query(context: Context, snapshot_json):
    s = SpecimenFactory.create_sync(producing_performed_specimen_collection=PerformedSpecimenCollectionFactory.build())

    query = """
        query($id: ID!) {
            Specimen(id: $id) {
                id
                performingMaterial {
                    code
                    formCode
                    description
                }
                producingPerformedSpecimenCollection {
                    id
                    dateRange
                    statusCode
                    statusDate
                }
            }
        }
    """

    result = schema.execute_sync(query, process_input(dict(id=s.id)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
