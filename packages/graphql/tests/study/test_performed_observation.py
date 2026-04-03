from syrupy.matchers import path_type

from bridg.alchemy import DataTypeName
from bridg.alchemy.factory import (
    PerformedObservationFactory,
    PerformedObservationResultFactory,
)
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from ..factory import PerformedObservationInputFactory, PerformedObservationResultInputFactory
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


def test_performed_observation_create(context: Context, snapshot_json):
    query = """
        mutation test($input: PerformedObservationInput!) {
            PerformedObservationCreate(input: $input) {
                id
                repetitionNumber
                nameCodeModifiedText
                dateRange
                negationReason
                negationIndicator
                statusCode
                statusDate
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
    """
    input = PerformedObservationInputFactory.build(
        resulted_performed_observation_result=[
            PerformedObservationResultInputFactory.build(data_type=None),
            PerformedObservationResultInputFactory.build(data_type=DataTypeName.CD),
            PerformedObservationResultInputFactory.build(data_type=DataTypeName.IVL_TS),
            PerformedObservationResultInputFactory.build(data_type=DataTypeName.PQ),
            PerformedObservationResultInputFactory.build(data_type=DataTypeName.ST),
            PerformedObservationResultInputFactory.build(data_type=DataTypeName.TS_DATE),
            PerformedObservationResultInputFactory.build(data_type=DataTypeName.TS_DATETIME),
        ]
    )
    result = schema.execute_sync(query, dict(input=process_input(input)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
