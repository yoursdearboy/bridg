from dirty_equals import IsList, IsUUID
from fastapi.testclient import TestClient
from syrupy.matchers import path_type

from bridg.alchemy.factory import (
    PerformedSpecimenCollectionFactory,
    PersonFactory,
    SpecimenFactory,
    StudyProtocolVersionFactory,
    StudySubjectFactory,
)
from bridg.api.main import app
from bridg.api.model import ProducedSpecimenData
from tests.factory import (
    MaterialDataFactory,
    PerformedSpecimenCollectionDataFactory,
    ProducedSpecimenDataFactory,
)

client = TestClient(app)


def test_performed_specimen_collection_show(snapshot_json):
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    ss = StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(),
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    psc = PerformedSpecimenCollectionFactory.create_sync(
        executing_study_protocol_version=space,
        involved_subject=ss,
        produced_specimen=SpecimenFactory.batch(3),
    )
    response = client.get(f"/space/{space.id}/subject/{ss.id}/activity/{psc.id}?result=1")
    assert response.status_code == 200
    assert response.json() == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_performed_specimen_collection_create(snapshot_json):
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    ss = StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(),
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    psc = PerformedSpecimenCollectionDataFactory.build(
        produced_specimen=[
            ProducedSpecimenDataFactory.build(
                id=None,
                performing_material=MaterialDataFactory.build(id=None),
            )
            for _ in range(3)
        ],
    )
    response = client.post(
        f"/space/{space.id}/subject/{ss.id}/activity",
        content=psc.model_dump_json(),
    )
    assert response.status_code == 200
    assert response.json() == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))


def test_performed_specimen_collection_update(random, snapshot_json):
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    ss = StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(),
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    psc = PerformedSpecimenCollectionFactory.create_sync(
        executing_study_protocol_version=space,
        involved_subject=ss,
        produced_specimen=SpecimenFactory.batch(10),
    )
    patch = PerformedSpecimenCollectionDataFactory.build(
        produced_specimen=[],
    )
    specimen_id = []
    material_id = []
    for i, old in enumerate(random.sample(psc.produced_specimen, 10)):
        if i < 2:
            new = ProducedSpecimenData.model_validate(old)
            patch.produced_specimen.append(new)
            specimen_id.append(str(old.id))
            material_id.append(str(old.performing_material_id))
        elif i < 5:
            new = ProducedSpecimenDataFactory.build(
                id=old.id,
                performing_material=MaterialDataFactory.build(
                    id=old.performing_material_id,
                    identifier=old.performing_material.identifier,
                ),
            )
            patch.produced_specimen.append(new)
            specimen_id.append(str(old.id))
            material_id.append(str(old.performing_material_id))
        elif i < 8:
            new = ProducedSpecimenDataFactory.build(
                id=None,
                performing_material=MaterialDataFactory.build(
                    id=None,
                ),
            )
            patch.produced_specimen.append(new)
            specimen_id.append(IsUUID)
            material_id.append(IsUUID)
        else:
            pass
    response = client.patch(f"/space/{space.id}/subject/{ss.id}/activity/{psc.id}", content=patch.model_dump_json())
    json = response.json()
    assert response.status_code == 200
    assert json["id"] == str(psc.id)
    assert json == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
    assert [ps["id"] for ps in json["produced_specimen"]] == IsList(*specimen_id, check_order=False)
    assert [ps["performing_material"]["id"] for ps in json["produced_specimen"]] == IsList(
        *material_id, check_order=False
    )
