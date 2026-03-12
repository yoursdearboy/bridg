from syrupy.matchers import path_type

from bridg.alchemy.factory import (
    PerformedActivityFactory,
    PersonFactory,
    PersonPostalAddressFactory,
    StudyProtocolVersionFactory,
    StudySubjectFactory,
)
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from ..utils import process_input


def test_person_performed_subject_involving_performed_activity_query(context: Context, snapshot_json):
    person = PersonFactory.create_sync(
        postal_address=PersonPostalAddressFactory.batch(2, street="Test street"),
    )
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    ss = StudySubjectFactory.create_sync(
        performing_biologic_entity=person,
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    PerformedActivityFactory.create_batch_sync(
        2,
        executing_study_protocol_version=space,
        involved_subject=ss,
    )

    query = """
        query($id: ID!) {
            Person(id: $id) {
                id
                performedSubject {
                    id
                    involvingPerformedActivity {
                        id
                        dateRange
                        negationReason
                        negationIndicator
                        statusCode
                        statusDate
                    }
                }
            }
        }
    """

    result = schema.execute_sync(query, process_input(dict(id=person.id)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
