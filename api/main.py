from fastapi import FastAPI

from api import person, space

openapi_tags = [*person.openapi_tags, *space.openapi_tags]
app = FastAPI(openapi_tags=space.openapi_tags)
app.include_router(person.router)
app.include_router(space.router)
