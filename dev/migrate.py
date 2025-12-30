# ruff: noqa: F403, F405

from bridg.alchemy import *
from common.env import load_env
from common.settings import load_settings
from sqlalchemy import create_engine


def main():
    load_env()
    settings = load_settings()
    engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    main()
