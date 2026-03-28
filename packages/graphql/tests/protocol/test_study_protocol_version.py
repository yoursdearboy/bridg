from syrupy.matchers import path_type

from bridg.alchemy import Organization, OrganizationName
from bridg.alchemy.factory import OrganizationFactory, StudyProtocolVersionFactory, StudySiteFactory
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from ..utils import process_input


def test_study_protocol_version_list(context: Context, snapshot_json):
    org = OrganizationFactory.create_sync(name=[OrganizationName(value="Lead Org LTD")])
    StudyProtocolVersionFactory.create_sync(
        acronym="TEST-1",
        executing_study_site=[
            StudySiteFactory.build(lead=True, performing_organization=org),
            StudySiteFactory.build(),
            StudySiteFactory.build(),
        ],
    )
    StudyProtocolVersionFactory.create_sync(
        acronym="TEST-2",
        executing_study_site=[
            StudySiteFactory.build(lead=True, performing_organization=org),
            StudySiteFactory.build(),
        ],
    )
    query = """
        query {
            StudyProtocolVersionList {
                id
                acronym
                executingStudySite {
                    id
                    lead
                    performingOrganization {
                        id
                        primaryName {
                            value
                        }
                    }
                }
            }
        }
    """
    result = schema.execute_sync(query, context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_study_protocol_version(context: Context, snapshot_json):
    spv = StudyProtocolVersionFactory.create_sync(
        acronym="TEST",
        executing_study_site=[
            StudySiteFactory.build(
                lead=True,
                performing_organization=Organization(name=[OrganizationName(value="Lead Org LTD")]),
            ),
            StudySiteFactory.build(),
            StudySiteFactory.build(),
        ],
    )
    query = """
        query($id: ID!) {
            StudyProtocolVersion(id: $id) {
                id
                acronym
                executingStudySite {
                    id
                    lead
                    performingOrganization {
                        id
                        primaryName {
                            value
                        }
                    }
                }
            }
        }
    """
    result = schema.execute_sync(query, process_input(dict(id=spv.id)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
