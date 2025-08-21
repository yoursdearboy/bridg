import pytest
from tests.factory.base import BaseFactory

from api.db import SessionLocal

__session__ = SessionLocal()


@pytest.fixture
def session():
    return __session__


BaseFactory.__session__ = __session__
