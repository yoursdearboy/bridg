import pytest
from common.db import SessionLocal
from common.env import load_env

from tests.factory.base import BaseFactory

load_env()


__session__ = SessionLocal()


@pytest.fixture
def session():
    return __session__


BaseFactory.__session__ = __session__
