from typing import Any, Dict, List

import yaml

import bridg

from .db import SessionLocal

session = SessionLocal()


def make_code_hook():
    def _from_str(x: str, cls):
        if code := session.query(cls).filter_by(code=x).one_or_none():
            return code
        return cls(code=x)

    def _from_dict(x: dict, cls):
        if code := session.query(cls).filter_by(**x).one_or_none():
            return code
        return cls(**x)

    cache = dict()

    def _from_either_with_cache(x: str | dict, cls):
        key = x["code"] if isinstance(x, dict) else x
        if code := cache.get(key):
            return code
        code = _from_dict(x, cls) if isinstance(x, dict) else _from_str(x, cls)
        cache[key] = code
        return code

    return _from_either_with_cache


bridg.converter.register_structure_hook_func(lambda x: issubclass(x, bridg.Code), make_code_hook())


MAP = {
    "defined_activity.name_code": bridg.DefinedActivity.NameCode,
    "defined_activity.category_code": bridg.DefinedActivity.CategoryCode,
    "defined_activity.subcategory_code": bridg.DefinedActivity.SubcategoryCode,
    "defined_activity": bridg.DefinedActivity,
    "defined_eligibility_criterion": bridg.DefinedEligibilityCriterion,
    "defined_exclusion_criterion": bridg.DefinedExclusionCriterion,
    "defined_inclusion_criterion": bridg.DefinedInclusionCriterion,
    "defined_observation": bridg.DefinedObservation,
    "defined_procedure": bridg.DefinedProcedure,
    "defined_substance_administration": bridg.DefinedSubstanceAdministration,
    "performed_activity.status_code": bridg.PerformedActivity.StatusCode,
    "performed_activity": bridg.PerformedActivity,
    "person": bridg.Person,
    "healthcare_facility": bridg.HealthcareFacility,
    "healthcare_provider": bridg.HealthcareProvider,
    "healthcare_provider_group": bridg.HealthcareProviderGroup,
    "study": bridg.Study,
    "study_site": bridg.StudySite,
    "study_subject": bridg.StudySubject,
}


def structure(data: Dict[str, List[Any]]):
    for key, values in data.items():
        class_ = MAP.get(key)
        if class_ is None:
            raise RuntimeError(f"Unknown root model with key {key}")
        for value in values:
            yield bridg.converter.structure(value, class_)


with open("dev/seed.yml") as f:
    data = yaml.load(f, yaml.FullLoader)
objects = structure(data)
session.add_all(objects)
session.commit()
session.close()
