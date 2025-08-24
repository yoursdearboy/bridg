from bridg import BiologicEntity, StudySubject
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from api.main import app
from tests.factory import StudyProtocolVersionFactory, StudySubjectFactory
from tests.factory.common.entity_name import EntityNameFactory
from tests.factory.common.person import PersonFactory
from tests.utils import _date_to_str, _enum_to_str, _or

client = TestClient(app)


def test_subject_index():
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    p = PersonFactory.build()
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
            "status": s.status.value if s.status else None,
            "status_date": s.status_date.isoformat() if s.status_date else None,
            "performing_biologic_entity": {
                "id": str(p.id),
                "administrative_gender_code": p.administrative_gender_code.value
                if p.administrative_gender_code
                else None,
                "birth_date": str(p.birth_date) if p.birth_date else None,
                "death_date": None,
                "death_date_estimated_indicator": None,
                "death_indicator": False,
                "primary_name": str(p),
            },
            "performing_organization": None,
        }
    ]


def test_subject_show():
    space = StudyProtocolVersionFactory.create_sync()
    sspvr = space.executing_study_site_protocol_version_relationship[0]
    p = PersonFactory.build()
    s = StudySubjectFactory.create_sync(
        performing_biologic_entity=p,
        performing_organization=None,
        assigned_study_site_protocol_version_relationship=[sspvr],
    )
    response = client.get(f"/spaces/{space.id}/subjects/{s.id}")
    assert response.status_code == 200
    assert response.json() == {
        "id": str(s.id),
        "status": s.status.value if s.status else None,
        "status_date": s.status_date.isoformat() if s.status_date else None,
        "performing_biologic_entity": {
            "id": str(p.id),
            "administrative_gender_code": p.administrative_gender_code.value if p.administrative_gender_code else None,
            "birth_date": str(p.birth_date) if p.birth_date else None,
            "death_date": None,
            "death_date_estimated_indicator": None,
            "death_indicator": False,
            "primary_name": str(p),
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
        "status": _or(s.status, _enum_to_str),
        "status_date": _or(s.status_date, _date_to_str),
        "performing_biologic_entity": {
            "administrative_gender_code": _or(p.administrative_gender_code, _enum_to_str),
            "birth_date": _or(p.birth_date, _date_to_str),
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
        "status": _or(s.status, _enum_to_str),
        "status_date": _or(s.status_date, _date_to_str),
        "performing_biologic_entity": {
            "id": _or(obj.performing_biologic_entity, lambda x: str(x.id)),
            "administrative_gender_code": _or(p.administrative_gender_code, _enum_to_str),
            "birth_date": _or(p.birth_date, _date_to_str),
            "death_date": None,
            "death_date_estimated_indicator": None,
            "death_indicator": None,
            "primary_name": str(p),
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
