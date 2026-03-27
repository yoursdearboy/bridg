import re
import typing
from typing import Annotated, Any

import strawberry

_private_re = re.compile(r"^(?:strawberry\.)?Private\[(.+)\]$")


def _annotation_is_private(annotation: Any) -> bool:
    if isinstance(annotation, str):
        # Ideally we would try to evaluate the annotation, but the args inside
        # may still not be available, as the module is still being constructed.
        # Checking for the pattern should be good enough for now.
        return _private_re.match(annotation) is not None

    orig = typing.get_origin(annotation)
    if orig is Annotated:
        return _annotation_is_private(typing.get_args(annotation)[0])
    return orig is strawberry.Private
