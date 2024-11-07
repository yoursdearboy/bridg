from enum import Enum
from typing import Any, Dict, List

from sqlalchemy import inspect
from sqlalchemy.orm import Relationship

from . import (
    HealthcareFacility,
    HealthcareProvider,
    HealthcareProviderGroup,
    Person,
    Study,
    StudySite,
    StudySubject,
)


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


class Converter:
    root = dict(
        person=Person,
        healthcare_facility=HealthcareFacility,
        healthcare_provider=HealthcareProvider,
        healthcare_provider_group=HealthcareProviderGroup,
        study=Study,
        study_site=StudySite,
        study_subject=StudySubject,
    )

    def __init__(self):
        self.cache = Cache()

    def _convert(self, model, value):
        info = inspect(model)
        obj = model()
        for key, value in value.items():
            attr = info.attrs[key]
            if isinstance(attr, Relationship):
                if attr.uselist:
                    value = [self.convert(attr.entity.class_, v) for v in value]
                else:
                    value = self.convert(attr.entity.class_, value)
            else:
                type = attr.class_attribute.type.python_type
                if issubclass(type, Enum):
                    value = type(value)
            setattr(obj, key, value)
        return obj

    def convert(self, model, value):
        if cached := self.cache.get(value):
            return cached
        obj = self._convert(model, value)
        self.cache.set(value, obj)
        return obj

    def run(self, data: Dict[str, List[Any]]):
        for key, values in data.items():
            model = self.root.get(key)
            if model is None:
                raise RuntimeError(f"Unknown root model with key {key}")
            for value in values:
                yield self.convert(model, value)


def convert(data: Dict[str, List[Any]]):
    return Converter().run(data)
