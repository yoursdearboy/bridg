import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from common.env import load_env

load_env(prefix="BRIDG")

DATABASE_URI = os.environ["BRIDG_SQLALCHEMY_DATABASE_URI"]

engine = create_engine(DATABASE_URI)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
