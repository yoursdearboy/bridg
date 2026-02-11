import inspect
from typing import Type, get_type_hints


class Context:
    pass


class Converter:
    def __init__(self) -> None:
        self._registry = []

    # TODO: extra classmethod?
    def register(self, from_=None, to=None):
        def decorator(f):
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

        return decorator

    # TODO: Move context to init?
    # TODO: Pass converter itself as first argument or make registered converters classy?
    def convert[T](self, input, class_: Type[T], *, context: Context) -> T:
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
                    if not issubclass(class_, to):
                        continue
                elif callable(to):
                    if not to(class_):
                        continue
                else:
                    raise RuntimeError("Unknown to predicate")
            kwargs = {}
            type_hints = get_type_hints(f)
            for key, hint in type_hints.items():
                try:
                    if issubclass(hint, Context):
                        kwargs[key] = context
                except TypeError:
                    pass
            return f(input, class_, **kwargs)
        raise RuntimeError(f"Can't comvert to {class_.__name__}")
