from bridg import BiologicEntity, StudySubject
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from api.main import app
from tests.factory import StudyProtocolVersionFactory, StudySubjectFactory
from tests.factory.common.entity_name import EntityNameFactory
from tests.factory.common.person import PersonFactory
from tests.utils import _or, date_str, enum_str

client = TestClient(app)


def test_subject_index():
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    p = PersonFactory.build()
    en = p.name[0]
    s = StudySubjectFactory.create_sync(
        performing_biologic_entity=p,
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    response = client.get(f"/spaces/{space.id}/subjects")
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": str(s.id),
            "status": _or(enum_str, s.status),
            "status_date": _or(date_str, s.status_date),
            "performing_biologic_entity": {
                "id": str(p.id),
                "administrative_gender_code": _or(enum_str, p.administrative_gender_code),
                "birth_date": _or(date_str, p.birth_date),
                "death_date": None,
                "death_date_estimated_indicator": None,
                "death_indicator": False,
                "primary_name": {
                    "family": en.family,
                    "given": en.given,
                    "id": str(en.id),
                    "label": f"{en.given} {en.family}",
                    "middle": None,
                    "patronymic": None,
                    "prefix": None,
                    "suffix": None,
                    "use": None,
                },
            },
            "performing_organization": None,
        }
    ]


def test_subject_show():
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    p = PersonFactory.build()
    en = p.name[0]
    s = StudySubjectFactory.create_sync(
        performing_biologic_entity=p,
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    response = client.get(f"/spaces/{space.id}/subjects/{s.id}")
    assert response.status_code == 200
    assert response.json() == {
        "id": str(s.id),
        "status": _or(enum_str, s.status),
        "status_date": _or(date_str, s.status_date),
        "performing_biologic_entity": {
            "id": str(p.id),
            "administrative_gender_code": _or(enum_str, p.administrative_gender_code),
            "birth_date": _or(date_str, p.birth_date),
            "death_date": None,
            "death_date_estimated_indicator": None,
            "death_indicator": False,
            "primary_name": {
                "family": en.family,
                "given": en.given,
                "id": str(en.id),
                "label": f"{en.given} {en.family}",
                "middle": None,
                "patronymic": None,
                "prefix": None,
                "suffix": None,
                "use": None,
            },
        },
        "performing_organization": None,
    }


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
    en = p.name[0]
    data = {
        "status": _or(enum_str, s.status),
        "status_date": _or(date_str, s.status_date),
        "performing_biologic_entity": {
            "administrative_gender_code": _or(enum_str, p.administrative_gender_code),
            "birth_date": _or(date_str, p.birth_date),
            "name": {
                "family": en.family,
                "given": en.given,
                "middle": en.middle,
                "patronymic": en.patronymic,
                "prefix": en.prefix,
                "suffix": en.suffix,
            },
        },
        "assigned_study_site_protocol_version_relationship": [str(sspvr.id)],
    }
    response = client.post(f"/spaces/{space.id}/subjects/", json=data)
    session.expire_all()
    assert response.status_code == 200
    assert len(sspvr.assigned_study_subject) == 1
    obj = sspvr.assigned_study_subject[0]
    # assert data.items() <= obj.__dict__.items()
    assert response.json() == {
        "id": str(obj.id),
        "status": _or(enum_str, s.status),
        "status_date": _or(date_str, s.status_date),
        "performing_biologic_entity": {
            "id": _or(lambda x: str(x.id), obj.performing_biologic_entity),
            "administrative_gender_code": _or(enum_str, p.administrative_gender_code),
            "birth_date": _or(date_str, p.birth_date),
            "death_date": None,
            "death_date_estimated_indicator": None,
            "death_indicator": None,
            "primary_name": {
                "family": en.family,
                "given": en.given,
                "id": _or(lambda x: str(x.name[0].id), obj.performing_biologic_entity),
                "label": f"{en.given} {en.family}",
                "middle": None,
                "patronymic": None,
                "prefix": None,
                "suffix": None,
                "use": None,
            },
        },
        "performing_organization": None,
    }


def test_lookup(session: Session):
    session.query(StudySubject).delete()
    session.query(BiologicEntity).delete()
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    p1 = PersonFactory.create_sync(name=[EntityNameFactory.build(family="Some")])
    p2 = PersonFactory.create_sync(name=[EntityNameFactory.build(family="Person")])
    p3 = PersonFactory.create_sync(name=[EntityNameFactory.build(family="Test")])
    ss = [
        StudySubjectFactory.create_sync(performing_biologic_entity=p, performing_organization=None)
        for p in [p1, p2, p3]
    ]
    sspvr.assigned_study_subject = ss
    query = {"performing_biologic_entity": {"name": {"family": "so"}}}
    response = client.post(f"/spaces/{space.id}/subjects/lookup", json=query)
    assert response.status_code == 200
    assert response.json() == [
        {"performing_biologic_entity": str(p1), "performing_biologic_entity_id": str(p1.id)},
        {"performing_biologic_entity": str(p2), "performing_biologic_entity_id": str(p2.id)},
    ]
