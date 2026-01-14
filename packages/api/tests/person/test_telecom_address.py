from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from syrupy.matchers import path_type

from bridg.alchemy.factory import PersonFactory, PersonTelecommunicationAddressFactory
from bridg.api.main import app
from bridg.api.model import PersonTelecommunicationAddressData
from tests.factory import PersonTelecommunicationAddressDataFactory

client = TestClient(app)


def test_telecom_address_index(snapshot_json):
    tel = PersonTelecommunicationAddressFactory.batch(2)
    person = PersonFactory.create_sync(telecom_address=tel)
    response = client.get(f"/person/{person.id}/telecommunication_address")
    assert response.status_code == 200
    assert response.json() == snapshot_json(matcher=path_type({r".*id": (str,)}, regex=True))


def test_telecom_address_create(snapshot_json):
    person = PersonFactory.create_sync(telecom_address=[])
    tel = PersonTelecommunicationAddressFactory.build()
    data = PersonTelecommunicationAddressData.model_validate(tel)
    response = client.post(f"/person/{person.id}/telecommunication_address", content=data.model_dump_json())
    assert response.status_code == 200
    assert response.json() == snapshot_json(matcher=path_type({"id": (str,)}))


def test_telecom_address_update(snapshot_json):
    person = PersonFactory.create_sync(telecom_address=PersonTelecommunicationAddressFactory.batch(1))
    tel = person.telecom_address[0]
    patch = PersonTelecommunicationAddressDataFactory.build(
        scheme=tel.scheme,
    )
    response = client.patch(f"/person/{person.id}/telecommunication_address/{tel.id}", content=patch.model_dump_json())
    assert response.status_code == 200
    assert response.json() == snapshot_json(matcher=path_type({"id": (str,)}))


def test_telecom_address_delete(session: Session):
    person = PersonFactory.create_sync(telecom_address=PersonTelecommunicationAddressFactory.batch(1))
    tel = person.telecom_address[0]
    response = client.delete(f"/person/{person.id}/telecommunication_address/{tel.id}")
    session.expire_all()
    assert response.status_code == 200
    assert person.telecom_address == []
