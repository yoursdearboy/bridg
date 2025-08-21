import pytest

from api.db import SessionLocal
from tests.factory.base import BaseFactory

__session__ = SessionLocal()


@pytest.fixture
def session():
    return __session__


BaseFactory.__session__ = __session__
