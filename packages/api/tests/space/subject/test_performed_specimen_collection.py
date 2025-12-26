from dirty_equals import IsList
from fastapi.testclient import TestClient
from syrupy.matchers import path_type

from api.main import app
from api.model import ProducedSpecimenData
from tests.api.factory import (
    MaterialDataFactory,
    PerformedSpecimenCollectionDataFactory,
    ProducedSpecimenDataFactory,
)
from tests.bridg.factory import (
    PerformedSpecimenCollectionFactory,
    PersonFactory,
    SpecimenFactory,
    StudyProtocolVersionFactory,
    StudySubjectFactory,
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
    response = client.get(f"/spaces/{space.id}/subjects/{ss.id}/activity/{psc.id}?result=1")
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
        f"/spaces/{space.id}/subjects/{ss.id}/activity",
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
    for old in psc.produced_specimen:
        x = random.random()
        if x < 0.25:
            new = ProducedSpecimenData.model_validate(old)
            patch.produced_specimen.append(new)
        elif x < 0.50:
            new = ProducedSpecimenDataFactory.build(
                id=old.id,
                performing_material=MaterialDataFactory.build(
                    id=old.performing_material_id,
                ),
            )
            patch.produced_specimen.append(new)
        elif x < 0.75:
            new = ProducedSpecimenDataFactory.build(
                id=None,
                performing_material=MaterialDataFactory.build(
                    id=None,
                ),
            )
            patch.produced_specimen.append(new)
        else:
            pass
    response = client.patch(f"/spaces/{space.id}/subjects/{ss.id}/activity/{psc.id}", content=patch.model_dump_json())
    assert response.status_code == 200
    assert response.json()["id"] == str(psc.id)
    assert response.json() == snapshot_json(matcher=path_type({r".*id$": (str,)}, regex=True))
    assert [ps["id"] for ps in response.json()["produced_specimen"]] == IsList(
        *[str(ps.id) for ps in patch.produced_specimen if ps.id],
        check_order=False,
        length=len(patch.produced_specimen),
    )
    assert [ps["performing_material"]["id"] for ps in response.json()["produced_specimen"]] == IsList(
        *[str(ps.performing_material.id) for ps in patch.produced_specimen if ps.performing_material.id],
        check_order=False,
        length=len(patch.produced_specimen),
    )
