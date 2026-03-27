from syrupy.matchers import path_type

from bridg.alchemy.factory import (
    BiologicEntityIdentifierFactory,
    BiologicEntityNameFactory,
    ConceptDescriptorFactory,
    PerformedActivityFactory,
    PersonFactory,
    PersonPostalAddressFactory,
    StudyProtocolVersionFactory,
    StudySubjectFactory,
)
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from ..factory import BiologicEntityNameInputFactory, IDInputFactory, PersonInputFactory
from ..utils import process_input


def test_person_query(context: Context, snapshot_json):
    identifier_type_code = ConceptDescriptorFactory.build("identifier/test")

    person = PersonFactory.create_sync(
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

    query = """
        query($id: ID!) {
            Person(id: $id) {
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

    result = schema.execute_sync(query, process_input(dict(id=person.id)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_person_list_query(context: Context, snapshot_json):
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
            PersonList {
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


def test_person_list_filter_by_name_query(context: Context, snapshot_json):
    identifier_type_code = ConceptDescriptorFactory.build("identifier/test")

    PersonFactory.create_sync(
        name=[
            BiologicEntityNameFactory.build(family="CaSeInSeNsItIvE MATch", given="First"),
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
        query($filter: PersonFilter) {
            PersonList(filter: $filter) {
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
    """
    filter = {
        "name": {
            "family": "at",
        }
    }

    result = schema.execute_sync(query, dict(filter=filter), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_person_list_filter_by_id_query(context: Context, snapshot_json):
    identifier_type_code = ConceptDescriptorFactory.build("identifier/test")

    PersonFactory.create_sync(
        name=[
            BiologicEntityNameFactory.build(family="CaSeInSeNsItIvE MATch", given="First"),
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
        query($filter: PersonFilter) {
            PersonList(filter: $filter) {
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
    """
    filter = {
        "identifier": {
            "identifier": {
                "root": "67890",
                "extension": None,
            }
        }
    }

    result = schema.execute_sync(query, dict(filter=filter), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


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


def test_person_create(context: Context, snapshot_json):
    query = """
        mutation test($input: PersonInput!) {
            PersonCreate(input: $input) {
                id
                administrativeGenderCode
                identifier {
                    identifier
                    identifierTypeCode
                }
                primaryName {
                    family
                    given
                }
            }
        }
    """
    input = PersonInputFactory.build(
        identifier=[IDInputFactory.build()],
        name=[BiologicEntityNameInputFactory.build(family="Test")],
    )
    result = schema.execute_sync(query, dict(input=process_input(input)), context_value=context)
    assert result.errors is None
    assert result.data == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
