from syrupy.matchers import path_type

from bridg.alchemy.factory import (
    BiologicEntityIdentifierFactory,
    BiologicEntityNameFactory,
    ConceptDescriptorFactory,
    PersonFactory,
)
from bridg.graphql.context import Context
from bridg.graphql.schema import schema


def test_person_query(context: Context, snapshot_json):
    identifier_type_code = ConceptDescriptorFactory.build("identifier/test")

    PersonFactory.create_sync(
        name=[
            BiologicEntityNameFactory.build(family="Test", given="First"),
            BiologicEntityNameFactory.build(family="Test", given="1st"),
        ],
        identifier=[
            BiologicEntityIdentifierFactory.build(
                identifier_root="12345",
                identifier_extension=None,
                identifier_type_code=identifier_type_code,
            )
        ],
    )

    PersonFactory.create_sync(
        name=[BiologicEntityNameFactory.build(family="Test", given="Second")],
        identifier=[
            BiologicEntityIdentifierFactory.build(
                identifier_root="67890",
                identifier_extension=None,
                identifier_type_code=identifier_type_code,
            )
        ],
    )

    query = """
        query {
            person {
                id
                name {
                    family
                    given
                }
                primaryName {
                    family
                    given
                }
                identifier {
                    identifier
                    identifierTypeCode
                }
            }
        }
    """

    result = schema.execute_sync(query, context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
