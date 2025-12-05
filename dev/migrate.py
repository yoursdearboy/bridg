# ruff: noqa: F403, F405

from bridg import *
from common.db import engine
from common.env import load_env

def main():
    load_env()
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    main()
