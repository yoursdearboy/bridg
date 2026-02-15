from __future__ import annotations

import inspect
from dataclasses import astuple, dataclass
from typing import Any, List, Protocol, Type, TypeVar, cast, get_origin


class Convert1[T](Protocol):
    def __call__(self, input: Any, /) -> T: ...


class Convert2[T](Protocol):
    def __call__(self, input: Any, class_: Type[T], /) -> T: ...


class Convert3[T](Protocol):
    def __call__(self, input: Any, class_: Type[T], converter: Converter, /) -> T: ...


Convert = Convert1 | Convert2 | Convert3


def configure(f: Convert):
    return f


@dataclass
class Wrap:
    f: Convert
    ftype: Type[Convert]
    from_: Any
    to: Any

    def __iter__(self):
        return iter(astuple(self))

    def __getitem__(self, keys):
        return iter(getattr(self, k) for k in keys)


def wrap(f: Convert):
    insp = inspect.signature(f)
    args = insp.parameters

    def get_f_type():
        if len(args) == 1:
            return Convert1
        if len(args) == 2:
            return Convert2
        if len(args) == 3:
            return Convert3
        raise ValueError(f"Invalid number of arguments: {len(args)}")

    def get_input_type():
        arg0 = list(args.values())[0]
        if arg0.annotation != inspect.Signature.empty:
            return arg0.annotation

    def get_return_type():
        ret = insp.return_annotation
        if isinstance(ret, TypeVar):
            ret = ret.__bound__
        return ret

    return Wrap(f, get_f_type(), get_input_type(), get_return_type())


class Converter:
    def __init__(self, converters: List[Convert]) -> None:
        self.converters = [wrap(f) for f in converters]

    def convert[T](self, input, class_: Type[T]) -> T:
        for wrap in self.converters:
            f, ftype, from_, to = wrap
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
                if ftype is Convert1:
                    return cast(Convert1, f)(input)
                if ftype is Convert2:
                    return cast(Convert2, f)(input, class_)
                if ftype is Convert3:
                    return cast(Convert3, f)(input, class_, self)
        raise RuntimeError(f"Can't comvert to {class_.__name__}")
