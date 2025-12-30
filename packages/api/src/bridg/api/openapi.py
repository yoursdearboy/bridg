"""
Handling of OpenAPI in FastAPI and Pydantic is so ugly,
so I want to ditch them for something simpler,
maybe LiteStar and dataclasses.
"""

import re

from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi as get_fastapi_openapi


# TODO: Remove this?
# Can we just keep model names unique, so this wouldn't be necessary?
# Try to remove this and compare schemas.
# It would be nice if Pydantic allowed setting the name.
# See https://github.com/pydantic/pydantic/issues/6304
def remap_schema(name: str) -> str:
    if name.startswith("api__model"):
        return name.split("__")[-1]
    return name


def remap_schemas(openapi_schema):
    schemas = openapi_schema["components"]["schemas"]

    for k in list(schemas.keys()):
        n = remap_schema(k)
        schemas[n] = schemas.pop(k)

    def replace_refs(obj):
        if isinstance(obj, dict):
            for k, v in obj.items():
                if k == "$ref" and isinstance(v, str):
                    m = re.match(r"#/components/schemas/(.+)", v)
                    if m:
                        s = m.group(1)
                        n = remap_schema(s)
                        obj[k] = f"#/components/schemas/{n}"
                else:
                    replace_refs(v)
        elif isinstance(obj, list):
            for v in obj:
                replace_refs(v)

    replace_refs(openapi_schema)

    return openapi_schema


def get_openapi(app: FastAPI):
    return remap_schemas(
        get_fastapi_openapi(
            title="FastAPI",
            version="0.1.0",
            routes=app.routes,
        )
    )
