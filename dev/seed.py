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

ROOT = dict(
    person=Person,
    healthcare_facility=HealthcareFacility,
    healthcare_provider=HealthcareProvider,
    healthcare_provider_group=HealthcareProviderGroup,
    study=Study,
)


def convert(model, value, cache=None):
    id_ = id(value)
    if cache and id_ in cache:
        return cache[id_]
    info = inspect(model)
    obj = model()
    for key, value in value.items():
        attr = info.attrs[key]
        if isinstance(attr, Relationship):
            if attr.uselist:
                value = [convert(attr.entity.class_, v) for v in value]
            else:
                value = convert(attr.entity.class_, value)
        setattr(obj, key, value)
    if cache:
        cache[id_] = value
    return obj


def convert_root(data, cache=None):
    for key, values in data.items():
        if key not in ROOT:
            print(f"Unknown key {key}")
            continue
        model = ROOT[key]
        for value in values:
            yield convert(model, value, cache=cache)


with SessionLocal() as session:
    with open("demo.yml") as f:
        data = yaml.load(f, yaml.FullLoader)
    objects = convert_root(data, cache={})
    session.add_all(objects)
    session.commit()
