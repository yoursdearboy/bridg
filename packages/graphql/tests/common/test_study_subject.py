import strawberry
from strawberry import Some
from syrupy.matchers import path_type

from bridg.alchemy.factory import (
    BiologicEntityNameFactory,
    PersonFactory,
    StudyProtocolVersionFactory,
    StudySiteFactory,
)
from bridg.graphql.context import Context
from bridg.graphql.schema import (
    StudySiteProtocolVersionRelationshipInput,
    StudySubjectCreateInput,
    schema,
)

from ..utils import process_input


def test_study_subject_create_using_existing_biologic_entity(context: Context, snapshot_json):
    spv = StudyProtocolVersionFactory.create_sync(
        acronym="TEST", executing_study_site=StudySiteFactory.batch(1, lead=True)
    )
    sspvr = spv.executing_study_site_protocol_version_relationship[0]
    p = PersonFactory.create_sync(
        name=[BiologicEntityNameFactory.build(family="Test")],
    )
    query = """
        mutation test($input: StudySubjectCreateInput!) {
            StudySubjectCreate(input: $input) {
                id
                performingBiologicEntity {
                    id
                    primaryName {
                        family
                        given
                    }
                }
                assignedStudySiteProtocolVersionRelationship {
                    executingStudySite {
                        id
                        lead
                    }
                    executedStudyProtocolVersion {
                        id
                        acronym
                    }
                }
            }
        }
    """
    input = StudySubjectCreateInput(
        id=None,
        performing_biologic_entity=None,
        performing_biologic_entity_id=Some(strawberry.ID(str(p.id))),
        status=None,
        status_date=None,
        assigned_study_site_protocol_version_relationship=[
            StudySiteProtocolVersionRelationshipInput(
                executing_study_site_id=strawberry.ID(str(sspvr.executing_study_site_id)),
                executed_study_protocol_version_id=strawberry.ID(str(sspvr.executed_study_protocol_version_id)),
            )
        ],
    )
    result = schema.execute_sync(query, dict(input=process_input(input)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
