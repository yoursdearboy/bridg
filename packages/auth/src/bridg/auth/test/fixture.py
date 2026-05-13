import pytest

from ..database import Base


@pytest.fixture(scope="function", autouse=True)
def auth_database(session):
    Base.metadata.create_all(session.bind)
