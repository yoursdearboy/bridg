import argparse
import sys

from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from bridg.common.env import load_env
from bridg.common.settings import load_settings

from .database import add_token, create_user, find_user_by_username, generate_token


def _error(msg: str):
    sys.stderr.write(msg)
    sys.stderr.write("\n")
    sys.exit(1)


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


def _auth(args):
    user = find_user_by_username(session, args.username)
    if user is None:
        return _error("User not found")
    token = args.token or generate_token()
    add_token(session, token, user.id)
    print(token)


parser_auth = subparsers.add_parser("auth")
parser_auth.add_argument("username", type=str)
parser_auth.add_argument("-t", "--token", dest="token", type=str)
parser_auth.set_defaults(func=_auth)

load_env()
settings = load_settings()
engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
session = Session(engine)
args = parser.parse_args()
args.func(args)
