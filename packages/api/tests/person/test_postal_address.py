from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from syrupy.matchers import path_type

from bridg.alchemy.factory import PersonFactory, PersonPostalAddressFactory
from bridg.api.main import app
from bridg.api.model import PersonPostalAddressData
from tests.factory import PersonPostalAddressDataFactory

client = TestClient(app)


def test_postal_address_index(snapshot_json):
    ad = PersonPostalAddressFactory.batch(2)
    person = PersonFactory.create_sync(postal_address=ad)
    response = client.get(f"/person/{person.id}/postal_address")
    assert response.status_code == 200
    assert response.json() == snapshot_json(matcher=path_type({r".*id": (str,)}, regex=True))


def test_postal_address_create(snapshot_json):
    person = PersonFactory.create_sync(postal_address=[])
    ad = PersonPostalAddressFactory.build()
    data = PersonPostalAddressData.model_validate(ad)
    response = client.post(f"/person/{person.id}/postal_address", content=data.model_dump_json())
    assert response.status_code == 200
    assert response.json() == snapshot_json(matcher=path_type({"id": (str,)}))


def test_postal_address_update(snapshot_json):
    person = PersonFactory.create_sync(postal_address=PersonPostalAddressFactory.batch(1))
    ad = person.postal_address[0]
    patch = PersonPostalAddressDataFactory.build(
        street=ad.street,
        building=ad.building,
    )
    response = client.patch(f"/person/{person.id}/postal_address/{ad.id}", content=patch.model_dump_json())
    assert response.status_code == 200
    assert response.json() == snapshot_json(matcher=path_type({"id": (str,)}))


def test_postal_address_delete(session: Session):
    person = PersonFactory.create_sync(postal_address=PersonPostalAddressFactory.batch(1))
    ad = person.postal_address[0]
    response = client.delete(f"/person/{person.id}/postal_address/{ad.id}")
    session.expire_all()
    assert response.status_code == 200
    assert person.postal_address == []
