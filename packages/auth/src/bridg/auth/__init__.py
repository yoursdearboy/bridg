import secrets

from sqlalchemy.orm import Session, sessionmaker
from starlette.authentication import (
    AuthCredentials,
    AuthenticationBackend,
    AuthenticationError,
    SimpleUser,
    UnauthenticatedUser,
)
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import PlainTextResponse

from bridg.common.settings import Settings

from .database import add_token, check_password, find_user_by_token, find_user_by_username
from .ldap import check_ldap


class AuthBackend(AuthenticationBackend):
    def __init__(self, session: sessionmaker[Session]):
        self.session = session

    async def authenticate(self, conn):
        if "Authorization" not in conn.headers:
            return

        header = conn.headers["Authorization"]
        scheme, token = header.split()
        if scheme.lower() != "bearer":
            return

        session = self.session()
        user = find_user_by_token(session, token=token)
        if user is None:
            raise AuthenticationError("Invalid auth credentials")

        return AuthCredentials(["authenticated"]), SimpleUser(user.username)


class AuthorizationMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        if isinstance(request.user, UnauthenticatedUser):
            return PlainTextResponse("Unauthorized", status_code=403)
        return await call_next(request)


def login_endpoint(settings: Settings, session: sessionmaker[Session]):
    async def endpoint(request: Request):
        data = await request.json()
        username = data.get("user")
        password = data.get("password")
        if username is None or password is None:
            return PlainTextResponse("Unauthenticated", status_code=401)

        sess = session()
        user = find_user_by_username(sess, username)
        if user is None:
            return PlainTextResponse("Unauthenticated", status_code=401)

        # TODO: Refactor this to some abstract strategies

        success = False

        if not success:
            if user.hashed_password:
                success = check_password(password, user.hashed_password)

        if not success:
            if user.ldap_username and settings.LDAP_URI:
                success = check_ldap(settings.LDAP_URI, user.ldap_username, password)

        if not success:
            return PlainTextResponse("Unauthenticated", status_code=401)

        token = secrets.token_urlsafe()
        add_token(sess, token=token, user_id=user.id)
        return PlainTextResponse(token)

    return endpoint
