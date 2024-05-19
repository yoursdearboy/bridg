from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

import umdb.swagger
import umdb.person.api


app = FastAPI(docs_url=None)

# FIXME: move CORS config to a config file
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(umdb.swagger.router)
app.include_router(umdb.person.api.router, prefix="/persons")
