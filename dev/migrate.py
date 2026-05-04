# ruff: noqa: F403, F405

from sqlalchemy import create_engine
from sqlalchemy.orm import configure_mappers

from bridg.alchemy import *
from bridg.auth import *
from bridg.common.env import load_env
from bridg.common.settings import load_settings


def main():
    load_env()
    settings = load_settings()
    engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
    configure_mappers()
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    main()
