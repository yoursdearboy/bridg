from datetime import date, datetime
from typing import List, TypeVar, get_type_hints

from cattr import Converter
from sqlalchemy import inspect
from sqlalchemy.orm import Relationship
from sqlalchemy.orm.collections import InstrumentedList
from toolz import dissoc

import bridg

from .db import Base

converter = Converter()


class Cache:
    def __init__(self):
        self._values = {}

    def hash(self, key):
        return id(key)

    def get(self, key):
        key = self.hash(key)
        return self._values.get(key)

    def set(self, key, value):
        key = self.hash(key)
        self._values[key] = value


T = TypeVar("T", bound=Base)


def make_model_hook():
    cache = Cache()

    def f(data: dict | T, class_: type[T]) -> T:
        if isinstance(data, class_):
            return data

        if cached := cache.get(data):
            return cached

        info = inspect(class_)
        if (polymorphic_on := info.polymorphic_on) is not None:
            if polymorphic_value := data.get(polymorphic_on.name, None):
                class_ = info.polymorphic_map[polymorphic_value].class_
                info = inspect(class_)

        obj = class_()
        cache.set(data, obj)

        annotations = get_type_hints(class_, localns=bridg.__dict__)

        for key, value in data.items():
            if value is None:
                continue

            if attr := info.attrs.get(key):
                if isinstance(attr, Relationship):
                    type = attr.entity.class_
                    if attr.uselist:
                        type = List[type]
                else:
                    type = attr.class_attribute.type.python_type
            elif ann := annotations.get(key):
                type = ann.__args__[0]
            else:
                continue

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
