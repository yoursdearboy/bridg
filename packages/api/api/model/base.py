from typing import Any, Generic, Set, TypeVar

from pydantic import BaseModel as PydanticBaseModel
from pydantic import ConfigDict, PrivateAttr

T = TypeVar("T")


def _omit(keys, x: dict) -> dict:
    return {k: v for k, v in x.items() if k not in keys}


def _dump(x: Any, context: Any = None) -> Any:
    match x:
        case dict():
            return {k: _dump(v, context=context) for k, v in x.items()}
        case list():
            return [_dump(v, context=context) for v in x]
        case BaseModel():
            return x.model_dump_sa(context=context)
        case _:
            return x


class BaseModel(PydanticBaseModel, Generic[T]):
    model_config = ConfigDict(from_attributes=True, arbitrary_types_allowed=True)
    _sa: type[T] = PrivateAttr()

    def model_dump_sa(self, exclude: Set = set(), context: Any = None) -> T:
        data = _dump(dict(self), context=context)
        data = _omit(exclude, data)
        return self._sa(**data)

    def model_update_sa(self, obj: T, exclude=set(), context: Any | None = None) -> T:
        data = _dump(dict(self), context=context)
        data = _omit(exclude, data)
        for key, value in data.items():
            setattr(obj, key, value)
        return obj
