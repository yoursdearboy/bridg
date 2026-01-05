from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from bridg.alchemy import BiologicEntity, StudySubject
from bridg.alchemy.factory import (
    BiologicEntityNameFactory,
    PersonFactory,
    StudyProtocolVersionFactory,
    StudySubjectFactory,
)
from bridg.api.main import app
from tests.utils import _or, date_str, datetime_str, enum_str, person_dict, study_subject_dict

client = TestClient(app)


def test_subject_index():
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    s = StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(),
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    response = client.get(f"/spaces/{space.id}/subjects")
    assert response.status_code == 200
    assert response.json() == [study_subject_dict(s)]


def test_subject_show():
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    s = StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(),
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    response = client.get(f"/spaces/{space.id}/subjects/{s.id}")
    assert response.status_code == 200
    assert response.json() == study_subject_dict(s)


def test_subject_show_404():
    space = StudyProtocolVersionFactory.create_sync()
    id = "12345678-1234-5678-1234-567812345678"
    response = client.get(f"/spaces/{space.id}/subjects/{id}")
    assert response.status_code == 404


def test_subject_create(session: Session):
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    p = PersonFactory.build()
    s = StudySubjectFactory.build(performing_biologic_entity=p, performing_organization=None)
    id = p.identifier[0]
    en = p.name[0]
    response = client.post(
        f"/spaces/{space.id}/subjects/",
        json={
            "status": _or(enum_str, s.status),
            "status_date": _or(datetime_str, s.status_date),
            "performing_biologic_entity": {
                "administrative_gender_code": _or(enum_str, p.administrative_gender_code),
                "birth_date": _or(date_str, p.birth_date),
                "primary_name": {
                    "family": en.family,
                    "given": en.given,
                    "middle": en.middle,
                    "patronymic": en.patronymic,
                    "prefix": en.prefix,
                    "suffix": en.suffix,
                },
                "primary_identifier": {
                    "identifier": {
                        "root": id.identifier.root,
                        "extension": id.identifier.extension,
                    },
                    "identifier_type_code": {
                        "code": id.identifier_type_code.code,
                        "code_system": id.identifier_type_code.code_system,
                        "data_type_name": "CD",
                        "display_name": id.identifier_type_code.display_name,
                    }
                    if id.identifier_type_code
                    else None,
                },
                "death_date": None,
                "death_date_estimated_indicator": None,
                "death_indicator": None,
            },
            "performing_biologic_entity_id": None,
            "assigned_study_site_protocol_version_relationship": [str(sspvr.id)],
        },
    )
    session.expire_all()
    assert response.status_code == 200
    assert len(sspvr.assigned_study_subject) == 1
    obj = sspvr.assigned_study_subject[0]
    assert response.json() == study_subject_dict(obj)


def test_subject_update(session):
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    s = StudySubjectFactory.create_sync(
        performing_biologic_entity=PersonFactory.build(),
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    patch = StudySubjectFactory.build(
        performing_biologic_entity=None,
        performing_organization=None,
    )
    response = client.patch(
        f"/spaces/{space.id}/subjects/{s.id}",
        json={
            "status": _or(enum_str, patch.status),
            "status_date": _or(datetime_str, patch.status_date),
        },
    )
    assert response.status_code == 200
    assert len(sspvr.assigned_study_subject) == 1
    obj = session.get(StudySubject, s.id)
    assert response.json() == {
        **study_subject_dict(obj),
        "status": _or(enum_str, patch.status),
        "status_date": _or(datetime_str, patch.status_date),
    }


def test_subject_lookup(session: Session):
    session.query(StudySubject).delete()
    session.query(BiologicEntity).delete()
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    p1 = PersonFactory.create_sync(name=[BiologicEntityNameFactory.build(family="Some")])
    p2 = PersonFactory.create_sync(name=[BiologicEntityNameFactory.build(family="Person")])
    p3 = PersonFactory.create_sync(name=[BiologicEntityNameFactory.build(family="Test")])
    for p in [p1, p2, p3]:
        StudySubjectFactory.create_sync(
            performing_biologic_entity=p,
            performing_organization=None,
            assigned_study_site_protocol_version_relationship=[sspvr],
        )
    query = {
        "performing_biologic_entity": {
            "administrative_gender_code": None,
            "birth_date": None,
            "death_date": None,
            "death_date_estimated_indicator": None,
            "death_indicator": None,
            "primary_name": {"family": "so"},
            "primary_identifier": None,
        }
    }
    response = client.post(f"/spaces/{space.id}/subjects/lookup", json=query)
    assert response.status_code == 200
    assert response.json() == [
        {"performing_biologic_entity": person_dict(p1)},
        {"performing_biologic_entity": person_dict(p2)},
    ]
