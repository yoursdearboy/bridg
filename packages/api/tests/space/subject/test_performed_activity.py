from bridg.factory import (
    PerformedActivityFactory,
    PersonFactory,
    StudyProtocolVersionFactory,
    StudySubjectFactory,
)
from fastapi.testclient import TestClient
from syrupy.matchers import path_type

from api.main import app
from tests.factory import PerformedActivityDataFactory

client = TestClient(app)


def test_performed_activity_show(snapshot_json):
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
    response = client.get(f"/spaces/{space.id}/subjects/{ss.id}/activity/{act.id}")
    assert response.status_code == 200
    assert response.json() == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_performed_activity_create(snapshot_json):
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    ss = StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(),
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    act = PerformedActivityDataFactory.build()
    response = client.post(f"/spaces/{space.id}/subjects/{ss.id}/activity", content=act.model_dump_json())
    assert response.status_code == 200
    assert response.json() == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_performed_activity_update(snapshot_json):
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
    patch = PerformedActivityDataFactory.build()
    response = client.patch(f"/spaces/{space.id}/subjects/{ss.id}/activity/{act.id}", content=patch.model_dump_json())
    assert response.status_code == 200
    assert response.json()["id"] == str(act.id)
    assert response.json() == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
