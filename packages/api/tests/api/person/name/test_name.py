from typing import TypeVar

import bridg
from api.db import SessionLocal
from api.main import app
from fastapi.testclient import TestClient
from polyfactory import Ignore, Use
from polyfactory.factories.sqlalchemy_factory import SQLAlchemyFactory

client = TestClient(app)


T = TypeVar("T")


session = SessionLocal()


class BaseFactory(SQLAlchemyFactory[T]):
    __session__ = session
    __is_base_factory__ = True
    __set_relationships__ = False
    __set_association_proxy__ = False
    __check_model__ = True


class PersonFactory(BaseFactory[bridg.Person]):
    __set_relationships__ = True

    id = Ignore()
    type = Ignore()
    # administrative_gender_code
    death_date = None
    death_date_estimated_indicator = None
    death_indicator = False
    # name


class EntityNameFactory(BaseFactory[bridg.EntityName]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    use = None
    family = Use(BaseFactory.__faker__.last_name)
    given = Use(BaseFactory.__faker__.first_name)
    middle = None
    patronymic = None
    prefix = None
    suffix = None


def test_person_names():
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


def test_person_name_delete():
    en = EntityNameFactory.build()
    person = PersonFactory.create_sync(name=[en])
    assert len(person.name) == 1
    client.delete(f"/persons/{person.id}/names/{en.id}")
    session.refresh(person)
    assert len(person.name) == 0
