import argparse

from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from bridg.common.env import load_env
from bridg.common.settings import load_settings

from .database import create_user

parser = argparse.ArgumentParser()
subparsers = parser.add_subparsers(dest="command", required=True)

parser_create = subparsers.add_parser("create")
parser_create.add_argument("username", type=str)
parser_create.add_argument("-p", "--password", dest="password", type=str)
parser_create.add_argument("--ldap-username", dest="ldap_username", type=str)
parser_create.set_defaults(
    func=lambda args: create_user(
        session,
        args.username,
        args.password,
        ldap_username=args.ldap_username,
    )
)

load_env()
settings = load_settings()
engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
session = Session(engine)
args = parser.parse_args()
args.func(args)
