import base64
import binascii

from starlette.authentication import (
    AuthCredentials,
    AuthenticationBackend,
    AuthenticationError,
    SimpleUser,
    UnauthenticatedUser,
)
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import PlainTextResponse


def _find_user(username, password) -> SimpleUser | None:
    if username == "demo" and password == "pass":
        return SimpleUser(username)


class AuthBackend(AuthenticationBackend):
    def __init__(self):
        pass

    async def authenticate(self, conn):
        if "Authorization" not in conn.headers:
            return

        auth = conn.headers["Authorization"]
        try:
            scheme, credentials = auth.split()
            if scheme.lower() != "basic":
                return
            decoded = base64.b64decode(credentials).decode("ascii")
        except (ValueError, UnicodeDecodeError, binascii.Error):
            raise AuthenticationError("Invalid auth credentials")

        username, _, password = decoded.partition(":")

        if user := _find_user(username, password):
            return AuthCredentials(["authenticated"]), user

        raise AuthenticationError("Invalid auth credentials")


class AuthorizationMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        if isinstance(request.user, UnauthenticatedUser):
            return PlainTextResponse("Unauthorized", status_code=401)
        return await call_next(request)
