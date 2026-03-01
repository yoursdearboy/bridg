from dataclasses import fields, is_dataclass
from datetime import date
from enum import Enum
from typing import Any
from uuid import UUID

from strawberry import Some
from strawberry.utils.str_converters import to_camel_case

from bridg.graphql.maybe import _annotation_is_maybe


def process_input(x: Any):
    if is_dataclass(x):
        result = dict()
        for field in fields(x):
            field_value = getattr(x, field.name)
            if _annotation_is_maybe(field.type):
                if field_value is None:
                    continue
                field_value = field_value
            result[field.name] = field_value
        return process_input(result)
    if isinstance(x, Some):
        return process_input(x.value)
    if isinstance(x, date):
        return str(x)
    if isinstance(x, Enum):
        return x.name
    if isinstance(x, UUID):
        return str(x)
    if isinstance(x, list):
        return [process_input(v) for v in x]
    if isinstance(x, dict):
        return {to_camel_case(k): process_input(v) for k, v in x.items()}
    return x
