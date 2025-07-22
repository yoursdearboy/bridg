from fastapi import APIRouter, FastAPI

from api import subjects

space_router = APIRouter(prefix="/space/{space_id:uuid}", tags=["space"])
space_router.include_router(subjects.router)

app = FastAPI()
app.include_router(space_router)
