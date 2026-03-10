from syrupy.matchers import path_type

from bridg.alchemy.factory import (
    PerformedActivityFactory,
    PersonFactory,
    StudyProtocolVersionFactory,
    StudySubjectFactory,
)
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from ..utils import process_input


def test_performed_activity_query(context: Context, snapshot_json):
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    ss = StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(),
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    act = PerformedActivityFactory.create_sync(
        executing_study_protocol_version=space,
        involved_subject=ss,
    )

    query = """
        query($id: ID!) {
            PerformedActivity(id: $id) {
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
            }
        }
    """

    result = schema.execute_sync(query, process_input(dict(id=act.id)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_performed_activity_list_query(context: Context, snapshot_json):
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    ss = StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(),
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    PerformedActivityFactory.create_batch_sync(
        2,
        executing_study_protocol_version=space,
        involved_subject=ss,
    )

    query = """
        query {
            PerformedActivityList {
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
            }
        }
    """

    result = schema.execute_sync(query, context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
