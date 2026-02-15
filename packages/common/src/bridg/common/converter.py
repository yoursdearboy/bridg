from __future__ import annotations

import inspect
from dataclasses import dataclass
from typing import Any, List, Protocol, Type, TypeVar, get_origin


class Convert[T](Protocol):
    def __call__(self, converter: Converter, input: Any, class_: Type[T], /) -> T: ...


@dataclass
class Wrap:
    from_: Any
    to: Any
    f: Convert


def converter(f: Convert):
    insp = inspect.signature(f)
    args = list(insp.parameters.values())
    assert len(args) >= 2

    inp = None
    if args[1].annotation != inspect.Signature.empty:
        inp = args[1].annotation

    ret = insp.return_annotation
    if isinstance(ret, TypeVar):
        ret = ret.__bound__

    return Wrap(inp, ret, f)


class Converter:
    def __init__(self, converters: List[Wrap]) -> None:
        self.converters = converters

    def convert[T](self, input, class_: Type[T]) -> T:
        for wrap in self.converters:
            from_ = wrap.from_
            to = wrap.to
            f = wrap.f
            if from_ is not None:
                if isinstance(from_, type):
                    if not isinstance(input, from_):
                        continue
                elif get_origin(from_) is not None:
                    if not isinstance(input, get_origin(from_)):
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
                else:
                    raise RuntimeError("Unknown to predicate")
            return f(self, input, class_)
        raise RuntimeError(f"Can't comvert to {class_.__name__}")
