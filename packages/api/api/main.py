from fastapi import FastAPI

from .openapi import get_openapi
from .router import openapi_tags, routers


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    app.openapi_schema = get_openapi(app)
    return app.openapi_schema


app = FastAPI(openapi_tags=openapi_tags)
app.openapi = custom_openapi
for router in routers:
    app.include_router(router)
