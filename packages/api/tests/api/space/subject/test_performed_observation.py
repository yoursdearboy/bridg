from bridg import PerformedObservation
from fastapi.testclient import TestClient

from api.main import app
from tests.factory import (
    PerformedObservationFactory,
    PerformedObservationResultFactory,
    PersonFactory,
    StudyProtocolVersionFactory,
    StudySubjectFactory,
)
from tests.utils import (
    _or,
    cd_dict,
    datavalue_dict,
    date_str,
    epoch_dict,
    omit_id,
    performed_observation_result_dict,
    studysite_dict,
)

client = TestClient(app)


def performed_observation_dict(x: PerformedObservation):
    return {
        "id": str(x.id),
        "reason_code": _or(cd_dict, x.reason_code),
        "status_code": _or(cd_dict, x.status_code),
        "status_date": _or(date_str, x.status_date),
        "context_for_study_site": _or(studysite_dict, x.context_for_study_site),
        "containing_epoch": _or(epoch_dict, x.containing_epoch),
        "instantiated_defined_activity": None,
        "resulted_performed_observation_result": [
            performed_observation_result_dict(r) for r in x.resulted_performed_observation_result
        ],
    }


def test_performed_observation_show():
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    ss = StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(),
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    pobs = PerformedObservationFactory.create_sync(
        executing_study_protocol_version=space,
        involved_subject=ss,
        resulted_performed_observation_result=PerformedObservationResultFactory.batch(10),
    )
    response = client.get(f"/spaces/{space.id}/subjects/{ss.id}/activity/{pobs.id}?result=1")
    assert response.status_code == 200
    assert response.json() == performed_observation_dict(pobs)


def test_performed_observation_create():
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    ss = StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(),
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    pobs = PerformedObservationFactory.build(
        resulted_performed_observation_result=PerformedObservationResultFactory.batch(10)
    )
    response = client.post(
        f"/spaces/{space.id}/subjects/{ss.id}/activity",
        json={
            "reason_code": _or(cd_dict, pobs.reason_code),
            "status_code": _or(cd_dict, pobs.status_code),
            "status_date": _or(date_str, pobs.status_date),
            "context_for_study_site_id": pobs.context_for_study_site_id,
            "containing_epoch_id": pobs.containing_epoch_id,
            "instantiated_defined_activity_id": pobs.instantiated_defined_activity_id,
            "resulted_performed_observation_result": [
                {
                    "value": _or(datavalue_dict, r.value),
                    "type_code": _or(cd_dict, r.type_code),
                    "value_null_flavor_reason": r.value_null_flavor_reason,
                    "baseline_indicator": r.baseline_indicator,
                    "derived_indicator": r.derived_indicator,
                    "created_date": _or(date_str, r.created_date),
                    "reported_date": _or(date_str, r.reported_date),
                    "comment": r.comment,
                }
                for r in pobs.resulted_performed_observation_result
            ],
        },
    )
    assert response.status_code == 200
    assert omit_id(response.json()) == omit_id(performed_observation_dict(pobs))
