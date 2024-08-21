import logging
from typing import Any, Dict, List

import yaml
from sqlalchemy import inspect
from sqlalchemy.orm import Relationship

from api.db import SessionLocal
from umdb import (
    HealthcareFacility,
    HealthcareProvider,
    HealthcareProviderGroup,
    Person,
    Study,
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
                logging.warn(f"Unknown root model with key {key}")
                continue
            for value in values:
                yield self.convert(model, value)


with SessionLocal() as session:
    with open("demo.yml") as f:
        data = yaml.load(f, yaml.FullLoader)
    converter = Converter()
    objects = converter.run(data)
    session.add_all(objects)
    session.commit()
