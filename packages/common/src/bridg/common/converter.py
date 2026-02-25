from __future__ import annotations

import inspect
from typing import Any, List, Protocol, Type, TypeVar, cast, get_origin


class Convert1[T](Protocol):
    def __call__(self, input: Any, /) -> T: ...


class Convert2[T](Protocol):
    def __call__(self, input: Any, class_: Type[T], /) -> T: ...


class Convert3[T](Protocol):
    def __call__(self, input: Any, class_: Type[T], converter: Converter, /) -> T: ...


Convert = Convert1 | Convert2 | Convert3


class Wrapper:
    def __init__(self, f: Convert):
        self._f = f
        self._inspect = inspect.signature(f)
        self._args = self._inspect.parameters
        self._input_type = self._get_input_type()
        self._return_type = self._get_return_type()

    def _get_input_type(self):
        args = self._inspect.parameters
        arg0 = list(args.values())[0]
        if arg0.annotation != inspect.Signature.empty:
            return arg0.annotation

    def check_input_type(self, input: Any):
        if self._input_type is None:
            return True
        if isinstance(self._input_type, type):
            if isinstance(input, self._input_type):
                return True
        if origin := get_origin(self._input_type):
            if isinstance(input, origin):
                return True
        return False

    def _get_return_type(self):
        ret = self._inspect.return_annotation
        if isinstance(ret, TypeVar):
            ret = ret.__bound__
        return ret

    def check_return_type(self, class_: Type):
        if self._return_type is None:
            return True
        if isinstance(self._return_type, type):
            if getattr(self._return_type, "_is_protocol", False):
                if isinstance(class_, self._return_type):
                    return True
            elif issubclass(class_, self._return_type):
                return True
        if origin := get_origin(self._return_type):
            # FIXME: check args?
            if origin == get_origin(class_):
                return True
        return False

    def check_types(self, input: Any, class_: Type):
        return self.check_input_type(input) and self.check_return_type(class_)

    def __call__[T](self, input: Any, class_: Type[T], converter: Converter) -> T:
        if len(self._args) == 1:
            return cast(Convert1, self._f)(input)
        if len(self._args) == 2:
            return cast(Convert2, self._f)(input, class_)
        if len(self._args) == 3:
            return cast(Convert3, self._f)(input, class_, converter)
        raise RuntimeError("Convert function must accept one, two or three args.")


def configure(f: Convert):
    return Wrapper(f)


class Converter:
    def __init__(self, converters: List[Wrapper]) -> None:
        self.converters = converters

    def convert[T](self, input, class_: Type[T]) -> T:
        for co in self.converters:
            if co.check_types(input, class_):
                return co(input, class_, self)
        raise RuntimeError(f"Can't convert to {class_.__name__}")
