from typing import TypeVar

import bridg
from api.db import SessionLocal
from api.main import app
from fastapi.testclient import TestClient
from polyfactory import Ignore, Use
from polyfactory.factories.sqlalchemy_factory import SQLAlchemyFactory

client = TestClient(app)


T = TypeVar("T")


class BaseFactory(SQLAlchemyFactory[T]):
    __session__ = SessionLocal()
    __is_base_factory__ = True
    __set_relationships__ = False
    __set_association_proxy__ = False
    __check_model__ = True


class PersonFactory(BaseFactory[bridg.Person]):
    __set_relationships__ = True

    type = Ignore()
    # administrative_gender_code
    death_date = None
    death_date_estimated_indicator = None
    death_indicator = False
    # name


class EntityNameFactory(BaseFactory[bridg.EntityName]):
    __set_as_default_factory_for_type__ = True

    use = None
    family = Use(BaseFactory.__faker__.last_name)
    given = Use(BaseFactory.__faker__.first_name)
    middle = None
    patronymic = None
    prefix = None
    suffix = None


def test_answer():
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
