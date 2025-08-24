from fastapi.testclient import TestClient

from api.main import app
from tests.factory import StudyProtocolVersionFactory, StudySubjectFactory
from tests.factory.common.person import PersonFactory

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
