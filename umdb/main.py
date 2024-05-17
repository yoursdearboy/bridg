from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

import umdb.person.api


app = FastAPI()

app.include_router(umdb.person.api.router, prefix="/persons")
