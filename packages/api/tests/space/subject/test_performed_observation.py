from dirty_equals import IsList, IsUUID
from fastapi.testclient import TestClient
from syrupy.matchers import path_type

from bridg.alchemy.factory import (
    PerformedObservationFactory,
    PerformedObservationResultFactory,
    PersonFactory,
    StudyProtocolVersionFactory,
    StudySubjectFactory,
)
from bridg.api.main import app
from bridg.api.model import ConceptDescriptor, PerformedObservationResultData
from tests.factory import (
    PerformedObservationDataFactory,
    PerformedObservationResultDataFactory,
)

client = TestClient(app)


def test_performed_observation_show(snapshot_json):
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
    response = client.get(f"/subject/{ss.id}/activity/{pobs.id}?result=1")
    assert response.status_code == 200
    assert response.json() == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_performed_observation_create(snapshot_json):
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    ss = StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(),
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    pobs = PerformedObservationDataFactory.build(
        resulted_performed_observation_result=PerformedObservationResultDataFactory.batch(10)
    )
    response = client.post(f"/subject/{ss.id}/activity", content=pobs.model_dump_json())
    assert response.status_code == 200
    assert response.json() == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_performed_observation_update(random, snapshot_json):
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    ss = StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(),
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    pobs = PerformedObservationFactory.create_sync(
        resulted_performed_observation_result=PerformedObservationResultFactory.batch(20)
    )
    patch = PerformedObservationDataFactory.build()
    id = []
    type_code = []
    for i, old in enumerate(random.sample(pobs.resulted_performed_observation_result, 20)):
        if i < 5:
            new = PerformedObservationResultData.model_validate(old)
            patch.resulted_performed_observation_result.append(new)
            id.append(str(old.id))
            type_code.append(ConceptDescriptor.model_validate(old.type_code))
        elif i < 10:
            new = PerformedObservationResultDataFactory.build(
                type_code=old.type_code,
                value_null_flavor_reason=old.value_null_flavor_reason,
                baseline_indicator=old.baseline_indicator,
                derived_indicator=old.derived_indicator,
                created_date=old.created_date,
                reported_date=old.reported_date,
                comment=old.comment,
            )
            patch.resulted_performed_observation_result.append(new)
            id.append(IsUUID)  # FIXME: maybe nope?
            type_code.append(ConceptDescriptor.model_validate(old.type_code))
        elif i < 15:
            new = PerformedObservationResultDataFactory.build()
            patch.resulted_performed_observation_result.append(new)
            id.append(IsUUID)
            type_code.append(new.type_code)
        else:
            pass
    random.shuffle(patch.resulted_performed_observation_result)
    response = client.patch(f"/subject/{ss.id}/activity/{pobs.id}", content=patch.model_dump_json())
    json = response.json()
    assert response.status_code == 200
    assert json["id"] == str(pobs.id)
    assert json == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
    assert [
        ConceptDescriptor.model_validate(res["type_code"]) for res in json["resulted_performed_observation_result"]
    ] == IsList(*type_code, check_order=False)
    assert [res["id"] for res in json["resulted_performed_observation_result"]] == IsList(*id, check_order=False)
