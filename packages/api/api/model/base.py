import typing
from pprint import pprint
from typing import Any, Generic, Set, TypeVar

from pydantic import BaseModel as PydanticBaseModel
from pydantic import ConfigDict, PrivateAttr

T = TypeVar("T")


# FIXME: Rewrite properly
class BaseModel(PydanticBaseModel, Generic[T]):
    model_config = ConfigDict(from_attributes=True, arbitrary_types_allowed=True)
    _sa: type[T] = PrivateAttr()

    def _dump(self, k, v, context: Any | None = None):
        if v is None:
            return
        elif isinstance(v, list):
            if len(v) == 0:
                return v
            elif isinstance(v[0], BaseModel):
                return [x.model_dump_sa(context=context) for x in v]
            else:
                return v
        elif isinstance(v, dict):
            if len(v) == 0:
                return v
            return {
                k: v.model_dump_sa(context=context)
                if isinstance(v, BaseModel)
                else self._dump(None, v, context=context)
                for k, v in v.items()
            }
        elif k:
            annotation = self.model_fields[k].annotation
            # FIXME: Use types of SA model
            origin = typing.get_origin(annotation)
            args = typing.get_args(annotation)
            if origin is typing.Union and type(None) in args and issubclass(args[0], BaseModel):
                return v.model_dump_sa(context=context)
        return v

    def model_dump_sa(self, exclude: Set = set(), context: Any | None = None) -> T:
        data = {k: v for k, v in dict(self).items() if k not in exclude}
        data: dict = self._dump(None, data, context=context)  # type: ignore
        return self._sa(**data)

    # FIXME: make it recursive
    def model_update_sa(self, obj: T, exclude=set(), context: Any | None = None) -> T:
        data = {k: v for k, v in dict(self).items() if k not in exclude}
        data: dict = self._dump(None, data, context=context)  # type: ignore
        for k, v in data.items():
            if k in exclude:
                continue
            setattr(obj, k, v)
        return obj
