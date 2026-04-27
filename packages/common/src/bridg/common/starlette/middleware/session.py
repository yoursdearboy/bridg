from sqlalchemy.orm import Session, sessionmaker
from starlette.middleware.base import DispatchFunction
from starlette.types import ASGIApp

from bridg.auth import BaseHTTPMiddleware


class SessionMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp, session: sessionmaker[Session], dispatch: DispatchFunction | None = None) -> None:
        super().__init__(app, dispatch)
        self.session = session

    async def dispatch(self, request, call_next):
        request.state.session = self.session()
        try:
            return await call_next(request)
        except:
            request.state.session.rollback()
            raise
        finally:
            request.state.session.close()
