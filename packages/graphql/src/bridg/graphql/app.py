from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.authentication import AuthenticationMiddleware
from starlette.routing import Route, WebSocketRoute
from strawberry.asgi import GraphQL

from bridg.alchemy import TerminologyService
from bridg.auth import AuthBackend, AuthorizationMiddleware, login_endpoint
from bridg.common.env import load_env
from bridg.common.settings import load_settings
from bridg.common.starlette.middleware.session import SessionMiddleware

from .context import Context
from .converter import Converter
from .schema import schema

load_env()
settings = load_settings()
engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
Session = sessionmaker(engine)


class App(GraphQL):
    async def get_context(self, request, response=None) -> Context:
        session = request.state.session
        terminology = TerminologyService(session)
        return Context(
            request=request,
            response=response,
            session=session,
            converter=Converter(terminology=terminology),
            terminology=terminology,
        )


graphql_app = App(schema)
middleware = [
    Middleware(SessionMiddleware, session=Session),
    Middleware(AuthenticationMiddleware, backend=AuthBackend()),
    Middleware(AuthorizationMiddleware),
]
app = Starlette(
    routes=[
        Route("/login", login_endpoint(settings, Session), methods=["POST"]),
        Route("/graphql", graphql_app.render_graphql_ide, methods=["GET"]),
        Route("/graphql", graphql_app, middleware=middleware, methods=["POST"]),
        WebSocketRoute("/graphql", graphql_app, middleware=middleware),
    ],
)
