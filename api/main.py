from fastapi import FastAPI

from api import space

openapi_tags = [*space.openapi_tags]
app = FastAPI(openapi_tags=space.openapi_tags)
app.include_router(space.router)
