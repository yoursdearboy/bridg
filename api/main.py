from fastapi import APIRouter, FastAPI

from api import site, subject

space_router = APIRouter(prefix="/space/{space_id:uuid}")
space_router.include_router(subject.router)
space_router.include_router(site.router)

openapi_tags = [subject.openapi_tag]

app = FastAPI(openapi_tags=openapi_tags)
app.include_router(space_router)
