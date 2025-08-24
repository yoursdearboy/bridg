from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from api.main import app
from tests.factory import EntityNameFactory, PersonFactory

client = TestClient(app)


def test_person_name_index():
    name = EntityNameFactory.batch(2)
    person = PersonFactory.create_sync(name=name)
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
        for en in name
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
    assert response.status_code == 200
    assert len(person.name) == 1
    obj = person.name[0]
    assert data.items() <= obj.__dict__.items()
    assert response.json() == {
        "id": str(obj.id),
        "label": str(obj),
        **data,
    }


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
    session.expire_all()
    assert response.status_code == 200
    assert len(person.name) == 1
    obj = person.name[0]
    assert patch.items() <= obj.__dict__.items()
    assert response.json() == {
        "id": str(obj.id),
        "label": str(obj),
        **patch,
    }


def test_person_name_delete(session: Session):
    en = EntityNameFactory.build()
    person = PersonFactory.create_sync(name=[en])
    response = client.delete(f"/persons/{person.id}/names/{en.id}")
    session.expire_all()
    assert response.status_code == 200
    assert person.name == []
