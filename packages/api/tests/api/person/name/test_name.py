from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from api.main import app
from tests.factory import EntityNameFactory, PersonFactory

client = TestClient(app)


def test_person_name_index():
    person = PersonFactory.create_sync()
    response = client.get(f"/persons/{person.id}/names")
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": str(en.id),
            "label": str(en),
            "use": None,
            "family": en.family,
            "given": en.given,
            "middle": en.middle,
            "patronymic": en.patronymic,
            "prefix": en.prefix,
            "suffix": en.suffix,
        }
        for en in person.name
    ]


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
    obj = person.primary_name
    assert obj
    assert response.status_code == 200
    assert response.json() == {
        "id": str(obj.id),
        "label": str(en),
        "use": None,
        "family": en.family,
        "given": en.given,
        "middle": en.middle,
        "patronymic": en.patronymic,
        "prefix": en.prefix,
        "suffix": en.suffix,
    }


def test_person_name_update():
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
    obj = person.primary_name
    assert obj
    assert response.status_code == 200
    assert response.json() == {
        "id": str(obj.id),
        "label": str(en2),
        "use": None,
        "family": en2.family,
        "given": en2.given,
        "middle": en2.middle,
        "patronymic": en2.patronymic,
        "prefix": en2.prefix,
        "suffix": en2.suffix,
    }


def test_person_name_delete(session: Session):
    en = EntityNameFactory.build()
    person = PersonFactory.create_sync(name=[en])
    assert len(person.name) == 1
    client.delete(f"/persons/{person.id}/names/{en.id}")
    session.refresh(person)
    assert len(person.name) == 0
