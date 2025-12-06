import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from common.settings import load_settings
from tests.factory.base import BaseFactory


@pytest.fixture(scope="session", autouse=True)
def session():
    settings = load_settings()
    engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
    session = Session(engine)

    BaseFactory.__session__ = session

    return session
