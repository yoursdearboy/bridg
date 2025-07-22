from fastapi import APIRouter, FastAPI

from api import site, subject

space_router = APIRouter(prefix="/space/{space_id:uuid}", tags=["space"])
space_router.include_router(subject.router)
space_router.include_router(site.router)

app = FastAPI()
app.include_router(space_router)
