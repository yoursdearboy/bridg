import typing
from typing import Generic, TypeVar

from pydantic import BaseModel as PydanticBaseModel
from pydantic import ConfigDict, PrivateAttr

T = TypeVar("T")


# FIXME: Rewrite properly
class BaseModel(PydanticBaseModel, Generic[T]):
    model_config = ConfigDict(from_attributes=True, arbitrary_types_allowed=True)
    _sa: type[T] = PrivateAttr()

    def model_dump_sa(self) -> T:
        def dump(kv):
            k, v = kv
            if v is None:
                return (k, v)
            annotation = self.model_fields[k].annotation
            origin = typing.get_origin(annotation)
            args = typing.get_args(annotation)
            if origin is typing.Union and type(None) in args and issubclass(args[0], BaseModel):
                return (k, v.model_dump_sa())
            elif origin is list and issubclass(args[0], BaseModel):
                return (k, [x.model_dump_sa() for x in v])
            return (k, v)

        kvs = dict(self)
        kvs = dict(dump(kv) for kv in kvs.items())
        return self._sa(**kvs)
