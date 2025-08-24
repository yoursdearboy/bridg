from datetime import date
from enum import Enum
from typing import Any, Callable, Optional, TypeVar, overload

T = TypeVar("T")
R = TypeVar("R")


@overload
def _or(f: Callable[[T], R], x: Optional[T], *args, default: Optional[R] = None) -> Optional[R]: ...


@overload
def _or(f: Callable[[T], R], default: Optional[R] = None) -> Callable[[Optional[T]], Optional[R]]: ...


def _or(
    f: Callable[[T], R], *args, default: Optional[R] = None, **kwargs
) -> Callable[[Optional[T]], Optional[R]] | Optional[R]:
    def g(x: Optional[T]) -> Optional[R]:
        if x is None:
            return default
        return f(x)

    if len(args) == 1:
        return g(args[0])

    return g


def enum_str(x: Enum) -> Any:
    return x.value


def date_str(x: date) -> str:
    return x.isoformat()
