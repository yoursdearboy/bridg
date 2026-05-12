# ruff: noqa: F403, F405
# pyright: reportWildcardImportFromLibrary=false

from sqlalchemy import create_engine  # noqa: I001
from sqlalchemy.orm import configure_mappers

from . import versioning  # noqa: F401

from bridg.alchemy import *
from bridg.auth import *
from bridg.common.env import load_env
from bridg.common.settings import load_settings


def main():
    load_env()
    settings = load_settings()
    engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
    configure_mappers()
    User.metadata.create_all(bind=engine)
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    main()
