import typing
from typing import Generic, TypeVar

from pydantic import BaseModel as PydanticBaseModel
from pydantic import ConfigDict, PrivateAttr

T = TypeVar("T")


# FIXME: Rewrite properly
class BaseModel(PydanticBaseModel, Generic[T]):
    model_config = ConfigDict(from_attributes=True, arbitrary_types_allowed=True)
    _sa: type[T] = PrivateAttr()

    def model_dump_sa(self, data=None) -> T:
        "Deprecated"

        def dump(kv):
            k, v = kv
            if v is None:
                return (k, v)
            annotation = self.model_fields[k].annotation
            # FIXME: Use types of SA model
            origin = typing.get_origin(annotation)
            args = typing.get_args(annotation)
            if isinstance(v, list):
                if len(v) == 0:
                    return (k, v)
                elif isinstance(v[0], BaseModel):
                    return (k, [x.model_dump_sa() for x in v])
                else:
                    return (k, v)
            if origin is typing.Union and type(None) in args and issubclass(args[0], BaseModel):
                return (k, v.model_dump_sa())
            return (k, v)

        data = dict(self) if data is None else data
        data = dict(dump(kv) for kv in data.items())
        return self._sa(**data)
