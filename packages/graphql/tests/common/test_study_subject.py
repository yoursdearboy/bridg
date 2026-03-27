import strawberry
from strawberry import Some
from syrupy.matchers import path_type

from bridg.alchemy.factory import (
    BiologicEntityNameFactory,
    PersonFactory,
    StudyProtocolVersionFactory,
    StudySiteFactory,
    StudySubjectFactory,
)
from bridg.graphql.context import Context
from bridg.graphql.schema import StudySiteProtocolVersionRelationshipInput, StudySubjectCreateInput, schema

from ..utils import process_input


def test_study_subject_list_query(context: Context, snapshot_json):
    spv = StudyProtocolVersionFactory.create_sync()
    sspvr = spv.executing_study_site_protocol_version_relationship[0]
    for _ in range(3):
        StudySubjectFactory.create_sync(
            performing_biologic_entity=PersonFactory.build(
                name=[
                    BiologicEntityNameFactory.build(family="Test"),
                ]
            ),
            assigned_study_site_protocol_version_relationship=[sspvr],
        )
    spv2 = StudyProtocolVersionFactory.create_sync()
    sspvr2 = spv2.executing_study_site_protocol_version_relationship[0]
    for _ in range(2):
        StudySubjectFactory.create_sync(
            performing_biologic_entity=PersonFactory.build(
                name=[
                    BiologicEntityNameFactory.build(family="Test"),
                ]
            ),
            assigned_study_site_protocol_version_relationship=[sspvr2],
        )

    query = """
        query {
            StudySubjectList {
                id
                performingBiologicEntity {
                    id
                    primaryName {
                        family
                        given
                    }
                }
            }
        }
    """

    result = schema.execute_sync(query, context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_study_subject_list_filter_by_spv_id_query(context: Context, snapshot_json):
    spv = StudyProtocolVersionFactory.create_sync()
    sspvr = spv.executing_study_site_protocol_version_relationship[0]
    for _ in range(3):
        StudySubjectFactory.create_sync(
            performing_biologic_entity=PersonFactory.build(
                name=[
                    BiologicEntityNameFactory.build(family="Test"),
                ]
            ),
            assigned_study_site_protocol_version_relationship=[sspvr],
        )
    spv2 = StudyProtocolVersionFactory.create_sync()
    sspvr2 = spv2.executing_study_site_protocol_version_relationship[0]
    for _ in range(2):
        StudySubjectFactory.create_sync(
            performing_biologic_entity=PersonFactory.build(
                name=[
                    BiologicEntityNameFactory.build(family="Test"),
                ]
            ),
            assigned_study_site_protocol_version_relationship=[sspvr2],
        )

    query = """
        query($studyProtocolVersionId: ID!) {
            StudySubjectList(filter: {
                studyProtocolVersionId: $studyProtocolVersionId
            }) {
                id
                performingBiologicEntity {
                    id
                    primaryName {
                        family
                        given
                    }
                }
            }
        }
    """

    result = schema.execute_sync(query, process_input(dict(studyProtocolVersionId=spv.id)), context_value=context)
    assert result.errors is None
    assert result.data is not None
    sorted_data = sorted(
        result.data["StudySubjectList"], key=lambda x: x["performingBiologicEntity"]["primaryName"]["given"]
    )
    assert sorted_data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


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
        performing_specimen=None,
        performing_specimen_id=None,
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
