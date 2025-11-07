from fastapi import FastAPI

from api import code_system, defined_activity, person, space
from api.openapi import get_openapi

openapi_tags = [*person.openapi_tags, *space.openapi_tags]
app = FastAPI(openapi_tags=space.openapi_tags)


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    app.openapi_schema = get_openapi(app)
    return app.openapi_schema


app.openapi = custom_openapi
app.include_router(code_system.router)
app.include_router(defined_activity.router)
app.include_router(person.router)
app.include_router(space.router)
