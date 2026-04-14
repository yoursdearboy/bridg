from dataclasses import asdict, dataclass
from uuid import uuid4

import jwt
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

from .database import find_user


@dataclass
class Payload:
    sub: str
    jti: str


def _encode(x: Payload, secret: str) -> str:
    return jwt.encode(asdict(x), secret, algorithm="HS256")


def _decode(x: str, secret: str) -> Payload:
    return Payload(**jwt.decode(x, secret, algorithms=["HS256"]))


class AuthBackend(AuthenticationBackend):
    def __init__(self, secret: str):
        self.secret = secret

    async def authenticate(self, conn):
        if "Authorization" not in conn.headers:
            return

        auth = conn.headers["Authorization"]
        try:
            scheme, credentials = auth.split()
            if scheme.lower() != "basic":
                return
            payload = _decode(credentials, self.secret)
        except jwt.PyJWTError:
            raise AuthenticationError("Invalid auth credentials")

        return AuthCredentials(["authenticated"]), SimpleUser(payload.sub)


class AuthorizationMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        if isinstance(request.user, UnauthenticatedUser):
            return PlainTextResponse("Unauthorized", status_code=403)
        return await call_next(request)


def login_endpoint(secret: str, session: sessionmaker[Session]):
    async def endpoint(request: Request):
        data = await request.json()
        if (user := data.get("user")) and (password := data.get("password")):
            if user := find_user(session(), user, password):
                payload = Payload(
                    sub=user.username,
                    jti=str(uuid4()),
                )
                token = _encode(payload, secret)
                return PlainTextResponse(token)
        return PlainTextResponse("Unauthenticated", status_code=401)

    return endpoint
