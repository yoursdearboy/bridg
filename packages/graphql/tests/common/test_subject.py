import strawberry
from strawberry import Some
from syrupy.matchers import path_type

from bridg.alchemy.factory import (
    BiologicEntityIdentifierFactory,
    BiologicEntityNameFactory,
    ConceptDescriptorFactory,
    PerformedActivityFactory,
    PersonFactory,
    StudyProtocolVersionFactory,
    StudySubjectFactory,
)
from bridg.graphql.context import Context
from bridg.graphql.schema import SubjectInput, schema

from ..factory import BiologicEntityInputFactory, BiologicEntityNameInputFactory
from ..utils import process_input


def test_subject_query(context: Context, snapshot_json):
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    subject = StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(
            name=[
                BiologicEntityNameFactory.build(family="Test"),
            ],
            identifier=[
                BiologicEntityIdentifierFactory.build(
                    identifier_root="12345",
                    identifier_extension=None,
                    identifier_type_code=ConceptDescriptorFactory.build("identifier/test"),
                )
            ],
        ),
        assigned_study_site_protocol_version_relationship=[sspvr],
    )

    query = """
        query($id: ID!) {
            Subject(id: $id) {
                id
                performingBiologicEntity {
                    id
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
        }
    """

    result = schema.execute_sync(query, process_input(dict(id=subject.id)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_subject_list_query(context: Context, snapshot_json):
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(
            name=[
                BiologicEntityNameFactory.build(family="Test"),
            ],
            identifier=[
                BiologicEntityIdentifierFactory.build(
                    identifier_root="12345",
                    identifier_extension=None,
                    identifier_type_code=ConceptDescriptorFactory.build("identifier/test"),
                )
            ],
        ),
        assigned_study_site_protocol_version_relationship=[sspvr],
    )

    query = """
        query {
            SubjectList {
                id
                performingBiologicEntity {
                    id
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
        }
    """

    result = schema.execute_sync(query, context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_subject_involving_performed_activity_query(context: Context, snapshot_json):
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    ss = StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(),
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    PerformedActivityFactory.create_batch_sync(
        2,
        executing_study_protocol_version=space,
        involved_subject=ss,
    )

    query = """
        query($id: ID!) {
            Subject(id: $id) {
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
    """

    result = schema.execute_sync(query, process_input(dict(id=ss.id)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_subject_create(context: Context, snapshot_json):
    query = """
        mutation test($input: SubjectInput!) {
            SubjectCreate(input: $input) {
                id
                performingBiologicEntity {
                    id
                    administrativeGenderCode
                    primaryName {
                        family
                        given
                    }
                }
            }
        }
    """
    input = SubjectInput(
        id=None,
        performing_biologic_entity=Some(
            BiologicEntityInputFactory.build(
                name=[
                    BiologicEntityNameInputFactory.build(family="Test"),
                ]
            )
        ),
        performing_biologic_entity_id=None,
        performing_specimen=None,
        performing_specimen_id=None,
    )
    result = schema.execute_sync(query, dict(input=process_input(input)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_subject_create_using_existing_biologic_entity(context: Context, snapshot_json):
    p = PersonFactory.create_sync(
        name=[BiologicEntityNameFactory.build(family="Test")],
    )
    query = """
        mutation test($input: SubjectInput!) {
            SubjectCreate(input: $input) {
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
    input = SubjectInput(
        id=None,
        performing_biologic_entity=None,
        performing_biologic_entity_id=Some(strawberry.ID(str(p.id))),
        performing_specimen=None,
        performing_specimen_id=None,
    )
    result = schema.execute_sync(query, dict(input=process_input(input)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_subject_create_fails_if_biologic_entity_and_id_provided(context: Context, snapshot_json):
    p = PersonFactory.create_sync(
        name=[BiologicEntityNameFactory.build(family="Existing")],
    )
    query = """
        mutation test($input: SubjectInput!) {
            SubjectCreate(input: $input) {
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
    input = dict(
        performing_biologic_entity=Some(
            BiologicEntityInputFactory.build(
                name=[
                    BiologicEntityNameInputFactory.build(family="New"),
                ]
            )
        ),
        performing_biologic_entity_id=Some(strawberry.ID(str(p.id))),
    )
    result = schema.execute_sync(query, dict(input=process_input(input)), context_value=context)
    assert result.errors is not None
    assert (
        result.errors[0].message
        == "Use one of: performing_biologic_entity_id,performing_biologic_entity,performing_specimen_id,performing_specimen"
    )
