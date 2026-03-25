from syrupy.matchers import path_type

from bridg.alchemy.factory import PerformedSpecimenMoveFactory
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from ..factory import PerformedSpecimenMoveInputFactory
from ..utils import process_input


def test_performed_specimen_move_query(context: Context, snapshot_json):
    psc = PerformedSpecimenMoveFactory.create_sync()

    query = """
        query($id: ID!) {
            PerformedSpecimenMove(id: $id) {
                id
                dateRange
                negationReason
                negationIndicator
                statusCode
                statusDate
                containingEpoch {
                   id
                   name
                   typeCode
                }
            }
        }
    """

    result = schema.execute_sync(query, process_input(dict(id=psc.id)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_performed_specimen_move_create(context: Context, snapshot_json):
    query = """
        mutation test($input: PerformedSpecimenMoveInput!) {
            PerformedSpecimenMoveCreate(input: $input) {
                id
                repetitionNumber
                nameCodeModifiedText
                dateRange
                negationReason
                negationIndicator
                statusCode
                statusDate
                containingEpoch {
                   id
                   name
                   typeCode
                }
            }
        }
    """
    input = PerformedSpecimenMoveInputFactory.build()
    result = schema.execute_sync(query, dict(input=process_input(input)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
