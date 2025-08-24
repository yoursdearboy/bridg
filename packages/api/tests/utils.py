# TODO: Replace with Returns library or something?

from datetime import date
from enum import Enum
from typing import Any, Callable, Optional, TypeVar

T = TypeVar("T")
R = TypeVar("R")


def _or(x: Optional[T], f: Callable[[T], R]) -> Optional[R]:
    if x is None:
        return
    return f(x)


def _enum_to_str(x: Enum) -> Any:
    return x.value


def _date_to_str(x: date) -> str:
    return x.isoformat()
