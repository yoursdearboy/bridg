from common.env import load_env
from fastapi import FastAPI, Response, status

from .openapi import get_openapi
from .router import openapi_tags, routers


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    app.openapi_schema = get_openapi(app)
    return app.openapi_schema


load_env()

app = FastAPI(openapi_tags=openapi_tags)
app.openapi = custom_openapi
for router in routers:
    app.include_router(router)


@app.get("/")
def index():
    return Response(status_code=status.HTTP_200_OK)
