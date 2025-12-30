from bridg.factory import EntityNameFactory, PersonFactory
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from api.main import app
from tests.utils import entity_name_dict, omit

client = TestClient(app)


def test_person_name_index():
    name = EntityNameFactory.batch(2)
    person = PersonFactory.create_sync(name=name)
    response = client.get(f"/persons/{person.id}/names")
    assert response.status_code == 200
    assert response.json() == [entity_name_dict(en) for en in name]


def test_person_name_create():
    person = PersonFactory.create_sync(name=[])
    en = EntityNameFactory.build()
    data = {
        "use": None,
        "family": en.family,
        "given": en.given,
        "middle": en.middle,
        "patronymic": en.patronymic,
        "prefix": en.prefix,
        "suffix": en.suffix,
    }
    response = client.post(f"/persons/{person.id}/names", json=data)
    assert response.status_code == 200
    assert len(person.name) == 1
    obj = person.name[0]
    assert response.json() == entity_name_dict(obj)


def test_person_name_update(session: Session):
    en = EntityNameFactory.build()
    en2 = EntityNameFactory.build()
    person = PersonFactory.create_sync(name=[en])
    patch = {
        "use": None,
        "family": en2.family,
        "given": en2.given,
        "middle": en2.middle,
        "patronymic": en2.patronymic,
        "prefix": en2.prefix,
        "suffix": en2.suffix,
    }
    response = client.patch(f"/persons/{person.id}/names/{en.id}", json=patch)
    assert response.status_code == 200
    assert len(person.name) == 1
    obj = person.name[0]
    session.refresh(obj)
    assert patch == omit(["id", "label"], entity_name_dict(obj))
    assert response.json() == entity_name_dict(obj)


def test_person_name_delete(session: Session):
    en = EntityNameFactory.build()
    person = PersonFactory.create_sync(name=[en])
    response = client.delete(f"/persons/{person.id}/names/{en.id}")
    session.expire_all()
    assert response.status_code == 200
    assert person.name == []
