from __future__ import annotations

import inspect
from typing import Any, List, Protocol, Tuple, Type, get_origin


class Convert(Protocol):
    def __call__[T](self, converter: Converter, input: Any, class_: Type[T]) -> T: ...


class Context:
    pass


class Converter:
    def __init__(self) -> None:
        self._registry: List[Tuple[Any, Any, Convert]] = []

    def register(self, from_=None, to=None):
        def wrapper(f: Convert):
            insp = inspect.signature(f)
            args = list(insp.parameters.values())
            arg1 = from_
            if arg1 is None:
                if args[0].annotation != inspect.Signature.empty:
                    arg1 = args[0].annotation
            arg2 = to
            if arg2 is None:
                if args[1].annotation != inspect.Signature.empty:
                    arg2 = args[1].annotation.__args__[0]
            self._registry.append((arg1, arg2, f))
            return f

        return wrapper

    def convert[T](self, input, class_: Type[T]) -> T:
        for from_, to, f in self._registry:
            if from_ is not None:
                if isinstance(from_, type):
                    if not isinstance(input, from_):
                        continue
                elif callable(from_):
                    if not from_(input):
                        continue
                else:
                    raise RuntimeError("Unknown from_ predicate")
            if to is not None:
                if isinstance(to, type):
                    if getattr(to, "_is_protocol", False):
                        if not isinstance(class_, to):
                            continue
                    elif not issubclass(class_, to):
                        continue
                elif get_origin(to) is not None:
                    # FIXME: check args?
                    if get_origin(to) != get_origin(class_):
                        continue
                elif callable(to):
                    if not to(class_):
                        continue
                else:
                    raise RuntimeError("Unknown to predicate")
            return f(self, input, class_)
        raise RuntimeError(f"Can't comvert to {class_.__name__}")
