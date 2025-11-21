from bridg import PerformedActivity
from fastapi.testclient import TestClient

from api.main import app
from tests.factory import PerformedActivityFactory
from tests.factory.common.person import PersonFactory
from tests.factory.common.study_subject import StudySubjectFactory
from tests.factory.protocol.study_protocol_version import StudyProtocolVersionFactory
from tests.utils import _or, cd_dict, date_str, epoch_dict, omit_id, studysite_dict

client = TestClient(app)


def performed_activity_dict(x: PerformedActivity):
    return {
        "id": str(x.id),
        "reason_code": _or(cd_dict, x.reason_code),
        "status_code": _or(cd_dict, x.status_code),
        "status_date": _or(date_str, x.status_date),
        "context_for_study_site": _or(studysite_dict, x.context_for_study_site),
        "containing_epoch": _or(epoch_dict, x.containing_epoch),
        "instantiated_defined_activity": None,
    }


def test_performed_activity_show():
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
    assert response.json() == performed_activity_dict(act)


def test_performed_activity_create():
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    ss = StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(),
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    act = PerformedActivityFactory.build()
    response = client.post(
        f"/spaces/{space.id}/subjects/{ss.id}/activity",
        json={
            "reason_code": _or(cd_dict, act.reason_code),
            "status_code": _or(cd_dict, act.status_code),
            "status_date": _or(date_str, act.status_date),
            "context_for_study_site_id": act.context_for_study_site_id,
            "containing_epoch_id": act.containing_epoch_id,
            "instantiated_defined_activity_id": act.instantiated_defined_activity_id,
        },
    )
    assert response.status_code == 200
    assert omit_id(response.json()) == omit_id(performed_activity_dict(act))


def test_performed_activity_update():
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
    patch = PerformedActivityFactory.build()
    response = client.patch(
        f"/spaces/{space.id}/subjects/{ss.id}/activity/{act.id}",
        json={
            "reason_code": _or(cd_dict, patch.reason_code),
            "status_code": _or(cd_dict, patch.status_code),
            "status_date": _or(date_str, patch.status_date),
            "context_for_study_site_id": patch.context_for_study_site_id,
            "containing_epoch_id": patch.containing_epoch_id,
            "instantiated_defined_activity_id": patch.instantiated_defined_activity_id,
        },
    )
    assert response.status_code == 200
    assert response.json()["id"] == str(act.id)
    assert omit_id(response.json()) == omit_id(performed_activity_dict(patch))
