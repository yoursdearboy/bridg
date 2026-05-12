import warnings

import pytest
from polyfactory.factories.base import BaseFactory
from sqlalchemy import create_engine, make_url
from sqlalchemy.orm import Session

from bridg.alchemy.db import Base
from bridg.alchemy.factory.base import BaseFactory as SQLAlchemyBaseFactory
from bridg.alchemy.terminology import TerminologyService
from bridg.common.settings import load_settings


def make_engine(x: str):
    url = make_url(x)
    connect_args = dict()
    if url.drivername == "sqlite":
        connect_args["autocommit"] = False
    return create_engine(url, connect_args=connect_args)


@pytest.fixture
def session():
    settings = load_settings()
    engine = make_engine(settings.SQLALCHEMY_DATABASE_URI)

    # see https://docs.sqlalchemy.org/en/20/orm/session_transaction.html#joining-a-session-into-an-external-transaction-such-as-for-test-suites
    connection = engine.connect()
    trans = connection.begin()

    session = Session(
        bind=connection,
        expire_on_commit=False,
        join_transaction_mode="create_savepoint",
    )

    # sqlalchemy_continuum creates sessions internally, triggering "create_savepoint",
    # but doesn't close them, causing a warning.
    # Either disable versioning:
    #     from sqlalchemy_continuum import versioning_manager
    #     versioning_manager.options["versioning"] = False
    # or suppress warning:
    warnings.filterwarnings("ignore", message="nested transaction already deassociated from connection")

    SQLAlchemyBaseFactory.__session__ = session

    yield session

    trans.rollback()
    connection.close()


@pytest.fixture(scope="function", autouse=True)
def database(session):
    Base.metadata.create_all(session.bind)


@pytest.fixture(scope="function", autouse=True)
def random():
    BaseFactory.__random__.seed(42)
    BaseFactory.__faker__.seed_instance(42)
    BaseFactory.__faker__.unique.clear()
    return BaseFactory.__random__


@pytest.fixture
def terminology(session: Session):
    return TerminologyService(session)
