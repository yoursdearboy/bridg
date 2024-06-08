from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import umdb.person.api
import umdb.person.name.api
import umdb.swagger

OPENAPI_TAGS = [
    {"name": "persons", "title": "Persons", "description": "Any human being."},
    {"name": "names", "title": "Names", "description": "Name of a person."},
]

app = FastAPI(docs_url=None, openapi_tags=OPENAPI_TAGS)

# FIXME: move CORS config to a config file
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(umdb.swagger.router)
app.include_router(umdb.person.api.router)
app.include_router(umdb.person.name.api.router)
