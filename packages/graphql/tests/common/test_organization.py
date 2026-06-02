from syrupy.matchers import path_type

from bridg.alchemy.factory import OrganizationFactory, OrganizationNameFactory
from bridg.graphql.context import Context
from bridg.graphql.schema import schema


def test_organization_list(context: Context, snapshot_json):
    OrganizationFactory.create_batch_sync(3)
    query = """
        query {
            OrganizationList {
                id
                primaryName {
                    value
                }
                type
                actual
            }
        }
    """
    result = schema.execute_sync(query, context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_organization_list_filter_by_name(context: Context, snapshot_json):
    OrganizationFactory.create_sync(name=[OrganizationNameFactory.build(value="Acme Corporation")])
    OrganizationFactory.create_sync(name=[OrganizationNameFactory.build(value="Global Health Inc")])
    OrganizationFactory.create_sync(name=[OrganizationNameFactory.build(value="ACME Labs")])

    query = """
        query($filter: OrganizationFilter) {
            OrganizationList(filter: $filter) {
                id
                primaryName {
                    value
                }
            }
        }
    """
    result = schema.execute_sync(query, dict(filter={"name": "acme"}), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
