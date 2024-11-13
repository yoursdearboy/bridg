from typing import Any, Dict, List

import yaml

import bridg

from .db import SessionLocal

MAP = dict(
    person=bridg.Person,
    healthcare_facility=bridg.HealthcareFacility,
    healthcare_provider=bridg.HealthcareProvider,
    healthcare_provider_group=bridg.HealthcareProviderGroup,
    study=bridg.Study,
    study_site=bridg.StudySite,
    study_subject=bridg.StudySubject,
)


def structure(data: Dict[str, List[Any]]):
    for key, values in data.items():
        class_ = MAP.get(key)
        if class_ is None:
            raise RuntimeError(f"Unknown root model with key {key}")
        for value in values:
            yield bridg.converter.structure(value, class_)


with SessionLocal() as session:
    with open("dev/seed.yml") as f:
        data = yaml.load(f, yaml.FullLoader)
    objects = structure(data)
    session.add_all(objects)
    session.commit()
