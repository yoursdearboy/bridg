from __future__ import annotations

import inspect
from typing import Any, List, Protocol, Type, TypeVar, Union, cast, get_args, get_origin


class Convert1[T](Protocol):
    def __call__(self, input: Any, /) -> T: ...


class Convert2[T](Protocol):
    def __call__(self, input: Any, class_: Type[T], /) -> T: ...


class Convert3[T](Protocol):
    def __call__(self, input: Any, class_: Type[T], converter: Converter, /) -> T: ...


Convert = Convert1 | Convert2 | Convert3


def _is_optional_type(x: Type):
    if get_origin(x) != Union:
        return False
    args = get_args(x)
    return len(args) > 1 and any(a is type(None) for a in args)


def _get_optional_type_arg(x: Type):
    if not _is_optional_type(x):
        raise RuntimeError("Not Optional")
    args = tuple(a for a in get_args(x) if a is not type(None))
    if len(args) == 1:
        return args[0]
    return Union[args]


def _bound_type(x: Any):
    if isinstance(x, TypeVar):
        return x.__bound__
    return x


def _compare_type(return_type: Any, class_: Any) -> bool:
    if return_type is None:
        return False

    if return_type is Any:
        return True

    if isinstance(return_type, type):
        if getattr(return_type, "_is_protocol", False):
            return isinstance(class_, return_type)

        if inspect.isclass(class_):
            return issubclass(class_, return_type)

    if get_origin(return_type) is list and get_origin(class_) is list:
        return _compare_type(
            _bound_type(get_args(return_type)[0]),
            _bound_type(get_args(class_)[0]),
        )

    if _is_optional_type(return_type) and _is_optional_type(class_):
        return _compare_type(
            _bound_type(_get_optional_type_arg(return_type)),
            _bound_type(_get_optional_type_arg(class_)),
        )

    # FIXME: do we need this? or maybe need even something more complex?
    if get_origin(return_type) == Union and get_origin(class_) == Union:
        return set(get_args(return_type)) == set(get_args(class_))

    return False


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
            return False
        if self._input_type is Any:
            return True
        if isinstance(self._input_type, type):
            return isinstance(input, self._input_type)
        if get_origin(self._input_type) == Union:
            return isinstance(input, self._input_type)
        if get_origin(self._input_type) is list:
            return isinstance(input, list)
        return False

    def _get_return_type(self):
        return _bound_type(self._inspect.return_annotation)

    def check_return_type(self, class_: Type):
        return _compare_type(self._return_type, class_)

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
