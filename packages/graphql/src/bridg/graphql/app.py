import uvicorn
from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.sessions import SessionMiddleware
from strawberry.asgi import GraphQL

from . import schema

graphql = GraphQL(schema)
app = Starlette(middleware=[Middleware(SessionMiddleware, secret_key="...", https_only=False)])
app.add_route("/graphql", graphql)  # type: ignore
app.add_websocket_route("/graphql", graphql)  # type: ignore

if __name__ == "__main__":
    uvicorn.run(
        "bridg.graphql.app:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        reload_dirs=["."],
    )
