from syrupy.matchers import path_type

from bridg.alchemy.factory import (
    DefinedObservationFactory,
    DefinedObservationResultFactory,
)
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from ..utils import process_input


def test_defined_activity_list_observation_fragment(context: Context, snapshot_json):
    for i in range(3):
        DefinedObservationFactory.create_sync(
            produced_defined_observation_result=DefinedObservationResultFactory.batch(3 + i),
        )
    query = """
        query {
            DefinedActivityList {
                ... on DefinedObservation {
                    id
                    reasonCode
                    comment
                    nameCode
                    categoryCode
                    subcategoryCode
                    description
                    statusCode
                    statusDate
                    producedDefinedObservationResult {
                        id
                        valueNegationIndicator
                        typeCode
                        targetType
                        targetCodingSystem
                        targetUnit
                        derivationExpression
                    }
                }
            }
        }
    """
    result = schema.execute_sync(query, context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_defined_activity_observation_fragment(context: Context, snapshot_json):
    activity = DefinedObservationFactory.create_sync(
        produced_defined_observation_result=DefinedObservationResultFactory.batch(10),
    )
    query = """
        query($id: ID!) {
            DefinedActivity(id: $id) {
                ... on DefinedObservation {
                    id
                    reasonCode
                    comment
                    nameCode
                    categoryCode
                    subcategoryCode
                    description
                    statusCode
                    statusDate
                    producedDefinedObservationResult {
                        id
                        valueNegationIndicator
                        typeCode
                        targetType
                        targetCodingSystem
                        targetUnit
                        derivationExpression
                    }
                }
            }
        }
    """
    result = schema.execute_sync(query, process_input(dict(id=activity.id)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
