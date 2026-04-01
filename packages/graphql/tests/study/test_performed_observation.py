from syrupy.matchers import path_type

from bridg.alchemy.factory import (
    PerformedObservationFactory,
    PerformedObservationResultFactory,
)
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from ..utils import process_input


def test_performed_activity_query_observation_fragment(context: Context, snapshot_json):
    act = PerformedObservationFactory.create_sync(
        resulted_performed_observation_result=PerformedObservationResultFactory.batch(30)
    )

    query = """
        query($id: ID!) {
            PerformedActivity(id: $id) {
                id
                dateRange
                negationReason
                negationIndicator
                statusCode
                statusDate
                ... on PerformedObservation {
                    resultedPerformedObservationResult {
                        id
                        typeCode
                        valueNullFlavorReason
                        baselineIndicator
                        derivedIndicator
                        createdDate
                        reportedDate
                        comment
                        value
                    }
                }
            }
        }
    """

    result = schema.execute_sync(query, process_input(dict(id=act.id)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_performed_activity_list_query_observation_fragment(context: Context, snapshot_json):
    for i in range(3):
        PerformedObservationFactory.create_sync(
            resulted_performed_observation_result=PerformedObservationResultFactory.batch(5 * (i + 1))
        )

    query = """
        query {
            PerformedActivityList {
                id
                dateRange
                negationReason
                negationIndicator
                statusCode
                statusDate
                ... on PerformedObservation {
                    resultedPerformedObservationResult {
                        id
                        typeCode
                        valueNullFlavorReason
                        baselineIndicator
                        derivedIndicator
                        createdDate
                        reportedDate
                        comment
                        value
                    }
                }
            }
        }
    """

    result = schema.execute_sync(query, context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
