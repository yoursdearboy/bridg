from dataclasses import Field, fields, is_dataclass
from datetime import date, datetime
from typing import List, Optional, TypeVar, get_origin, get_type_hints
from uuid import UUID

from cattr import Converter
from sqlalchemy import inspect
from sqlalchemy.orm import Relationship
from sqlalchemy.orm.collections import InstrumentedList
from toolz import dissoc

import bridg
import bridg.core

from .db import Base

converter = Converter()


class Cache:
    def __init__(self):
        self._values = {}

    def get(self, key):
        return self._values.get(key)

    def set(self, key, value):
        self._values[key] = value


T = TypeVar("T", bound=Base)


def _cache_key(data: dict, class_: type[T]) -> str | None:
    info = inspect(class_)

    def _get_foreign_key(key):
        for rel in info.relationships:
            if key in rel.local_columns:
                k1 = rel.key
                k2 = list(rel.remote_side)[0].key
                return data.get(k1, {}).get(k2)

    def _get_key(key):
        if key.foreign_keys:
            return _get_foreign_key(key)
        return data.get(key.name)

    key = ""
    for pk in info.primary_key:
        value = _get_key(pk)
        if value is not None:
            key += "-" + str(value)
        else:
            return

    return class_.__tablename__ + "-" + key


def get_property_annotation(class_, key):
    if prop := getattr(class_, key):
        if getter := getattr(prop, "fget"):
            return getter.__annotations__.get("return")


def make_model_hook():
    cache = Cache()

    def f(data: dict, class_: type[T]) -> T:
        if isinstance(data, class_):
            return data

        key = _cache_key(data, class_)

        if key is not None:
            if cached := cache.get(key):
                return cached

        info = inspect(class_)
        if (polymorphic_on := info.polymorphic_on) is not None:
            if polymorphic_value := data.get(polymorphic_on.name, None):
                class_ = info.polymorphic_map[polymorphic_value].class_
                info = inspect(class_)

        obj = class_()

        if key is not None:
            cache.set(key, obj)

        annotations = get_type_hints(class_, localns=bridg.__dict__)

        for key, value in data.items():
            if value is None:
                continue

            if attr := info.attrs.get(key):
                if isinstance(attr, Relationship):
                    type = attr.entity.class_
                    if attr.uselist:
                        type = List[type]
                # FIXME: dont' repeat yourself (see below)
                elif ann := annotations.get(key):
                    type = ann.__args__[0]
                else:
                    type = attr.class_attribute.type.python_type
            elif ann := annotations.get(key):
                type = ann.__args__[0]
            elif ann := get_property_annotation(class_, key):
                type = ann
            else:
                # TODO: add logging
                raise RuntimeError(f"Can't structure {key} of {class_}")

            value = converter.structure(value, type)
            setattr(obj, key, value)

        return obj

    return f


@converter.register_structure_hook
def identity_datetime_hook(x: datetime, _) -> datetime:
    return x


@converter.register_structure_hook
def identity_date_hook(x: datetime, _) -> date:
    return x


converter.register_structure_hook_func(lambda x: issubclass(x, Base), make_model_hook())

converter.register_unstructure_hook(Base, lambda x: converter.unstructure(dissoc(x.__dict__, "_sa_instance_state")))
converter.register_unstructure_hook(InstrumentedList, lambda x: converter.unstructure(list(x)))


def dataclass_hook(x, cls):
    "More robust than standard one, because it handles any object supporting getattr"

    def pair(field: Field):
        key = field.name
        value = x.get(key) if isinstance(x, dict) else getattr(x, key)
        ftype = field.type
        assert isinstance(ftype, type) or get_origin(ftype) is not None
        value = converter.structure(value, ftype)  # type: ignore
        return (key, value)

    kwargs = dict(map(pair, fields(cls)))
    obj = cls(**kwargs)
    return obj


converter.register_structure_hook_func(is_dataclass, dataclass_hook)


@converter.register_structure_hook
def uuid_hook(x: str, _) -> UUID:
    if isinstance(x, UUID):
        return x
    return UUID(x)


# FIXME: that's inference is weird
@converter.register_structure_hook
def datavalue_hook(x, cls) -> Optional[bridg.core.DataValue]:
    if x is None:
        return None
    if isinstance(x, dict):
        if "unit" in x:
            return bridg.core.PhysicalQuantity(**x)
        if "code_system" in x:
            return bridg.core.ConceptDescriptor(**x)
    raise RuntimeError("Can't handle DataValue")
