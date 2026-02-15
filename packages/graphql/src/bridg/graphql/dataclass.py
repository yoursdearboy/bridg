from typing import Any, ClassVar, Mapping, Protocol, runtime_checkable


@runtime_checkable
class Dataclass(Protocol):
    __dataclass_fields__: ClassVar[Mapping[str, Any]]
