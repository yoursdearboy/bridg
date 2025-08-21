from api.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_answer():
    person_id = "99132ae7-25dd-43ba-808e-cdb3b29af285"
    response = client.get(f"/persons/{person_id}/names")
    assert response.status_code == 200
