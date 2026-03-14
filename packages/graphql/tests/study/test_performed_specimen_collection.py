from syrupy.matchers import path_type

from bridg.alchemy.factory import PerformedSpecimenCollectionFactory, SpecimenFactory
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from ..factory import PerformedSpecimenCollectionInputFactory, SpecimenInputFactory
from ..utils import process_input


def test_performed_specimen_collection_query(context: Context, snapshot_json):
    psc = PerformedSpecimenCollectionFactory.create_sync(
        produced_specimen=SpecimenFactory.batch(3),
    )

    query = """
        query($id: ID!) {
            PerformedSpecimenCollection(id: $id) {
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
                producedSpecimen {
                    id
                    performingMaterial {
                        code
                        formCode
                        description
                    }
                }
            }
        }
    """

    result = schema.execute_sync(query, process_input(dict(id=psc.id)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_performed_specimen_collection_create(context: Context, snapshot_json):
    query = """
        mutation test($input: PerformedSpecimenCollectionInput!) {
            PerformedSpecimenCollectionCreate(input: $input) {
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
                producedSpecimen {
                    id
                    performingMaterial {
                        code
                        formCode
                        description
                    }
                }
            }
        }
    """
    input = PerformedSpecimenCollectionInputFactory.build(
        produced_specimen=SpecimenInputFactory.batch(3),
    )
    result = schema.execute_sync(query, dict(input=process_input(input)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
