from contextvars import ContextVar

from starlette.middleware.base import BaseHTTPMiddleware

from bridg.auth import AuthenticatedUser, UnauthenticatedUser

_user_var = ContextVar[AuthenticatedUser | UnauthenticatedUser | None]("user", default=None)


def get_user():
    return _user_var.get()


class UserMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        with _user_var.set(request.user):
            return await call_next(request)
