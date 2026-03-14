from syrupy.matchers import path_type

from bridg.alchemy import PlaceName
from bridg.alchemy.factory import PerformedEncounterFactory, PlaceFactory
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from ..factory import PerformedEncounterInputFactory
from ..utils import process_input


def test_performed_encounter_query(context: Context, snapshot_json):
    psc = PerformedEncounterFactory.create_sync(
        departing_to_place=PlaceFactory.build(),
        arriving_from_place=PlaceFactory.build(),
    )

    query = """
        query($id: ID!) {
            PerformedEncounter(id: $id) {
                id
                dateRange
                negationReason
                negationIndicator
                statusCode
                statusDate
                departingToPlace {
                    id
                    primaryName {
                        value
                    }
                }
                arrivingFromPlace {
                    id
                    primaryName {
                        value
                    }
                }
            }
        }
    """

    result = schema.execute_sync(query, process_input(dict(id=psc.id)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_performed_encounter_create(context: Context, snapshot_json):
    departing_to_place = PlaceFactory.create_sync(name=[PlaceName(value="Departing to")])
    arriving_from_place = PlaceFactory.create_sync(name=[PlaceName(value="Arriving from")])
    query = """
        mutation test($input: PerformedEncounterInput!) {
            PerformedEncounterCreate(input: $input) {
                id
                repetitionNumber
                nameCodeModifiedText
                dateRange
                negationReason
                negationIndicator
                statusCode
                statusDate
                departingToPlace {
                    id
                    primaryName {
                        value
                    }
                }
                arrivingFromPlace {
                    id
                    primaryName {
                        value
                    }
                }
            }
        }
    """
    input = PerformedEncounterInputFactory.build(
        departing_to_place_id=departing_to_place.id,
        arriving_from_place_id=arriving_from_place.id,
    )
    result = schema.execute_sync(query, dict(input=process_input(input)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
