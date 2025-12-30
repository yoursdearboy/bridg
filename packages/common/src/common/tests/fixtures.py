import pytest
from bridg.db import Base
from bridg.factory.base import BaseFactory as SQLAlchemyBaseFactory
from polyfactory.factories.base import BaseFactory
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from syrupy.assertion import SnapshotAssertion
from syrupy.extensions.json import JSONSnapshotExtension

from common.settings import load_settings


@pytest.fixture(scope="session", autouse=True)
def session():
    settings = load_settings()
    engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
    session = Session(engine)

    SQLAlchemyBaseFactory.__session__ = session

    return session


@pytest.fixture(scope="function", autouse=True)
def database(session):
    Base.metadata.create_all(session.bind)
    yield
    Base.metadata.drop_all(session.bind)


@pytest.fixture(scope="function", autouse=True)
def random():
    BaseFactory.__random__.seed(42)
    BaseFactory.__faker__.seed_instance(42)
    BaseFactory.__faker__.unique.clear()
    return BaseFactory.__random__


@pytest.fixture
def snapshot_json(snapshot) -> SnapshotAssertion:
    return snapshot.with_defaults(extension_class=JSONSnapshotExtension)
