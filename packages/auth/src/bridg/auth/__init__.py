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

from .database import add_token, find_user_by_credentials, find_user_by_token


class AuthBackend(AuthenticationBackend):
    def __init__(self, session: sessionmaker[Session]):
        self.session = session

    async def authenticate(self, conn):
        if "Authorization" not in conn.headers:
            return

        header = conn.headers["Authorization"]
        scheme, token = header.split()
        if scheme.lower() != "basic":
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


def login_endpoint(session: sessionmaker[Session]):
    async def endpoint(request: Request):
        data = await request.json()
        if (user := data.get("user")) and (password := data.get("password")):
            s = session()
            if user := find_user_by_credentials(s, user, password):
                token = secrets.token_urlsafe()
                add_token(s, token=token, user_id=user.id)
                return PlainTextResponse(token)
        return PlainTextResponse("Unauthenticated", status_code=401)

    return endpoint
