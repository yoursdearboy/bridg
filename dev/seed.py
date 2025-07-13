from typing import Any, Dict, List, TypedDict

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
        cls_key = cls.__qualname__
        code_key = x["code"] if isinstance(x, dict) else x
        key = cls_key + code_key
        if code := cache.get(key):
            return code
        code = _from_dict(x, cls) if isinstance(x, dict) else _from_str(x, cls)
        cache[key] = code
        return code

    return _from_either_with_cache


bridg.converter.register_structure_hook_func(lambda x: issubclass(x, bridg.Code), make_code_hook())


Root = TypedDict(
    "Root",
    {
        "defined_activity.name_code": List[bridg.DefinedActivity.NameCode],
        "defined_activity.category_code": List[bridg.DefinedActivity.CategoryCode],
        "defined_activity.subcategory_code": List[bridg.DefinedActivity.SubcategoryCode],
        "defined_activity": List[bridg.DefinedActivity],
        "defined_eligibility_criterion": List[bridg.DefinedEligibilityCriterion],
        "defined_exclusion_criterion": List[bridg.DefinedExclusionCriterion],
        "defined_inclusion_criterion": List[bridg.DefinedInclusionCriterion],
        "defined_observation": List[bridg.DefinedObservation],
        "defined_procedure": List[bridg.DefinedProcedure],
        "defined_substance_administration": List[bridg.DefinedSubstanceAdministration],
        "performed_activity.status_code": List[bridg.PerformedActivity.StatusCode],
        "performed_activity": List[bridg.PerformedActivity],
        "person": List[bridg.Person],
        "healthcare_facility": List[bridg.HealthcareFacility],
        "healthcare_provider": List[bridg.HealthcareProvider],
        "healthcare_provider_group": List[bridg.HealthcareProviderGroup],
        "study": List[bridg.Study],
        "study_site": List[bridg.StudySite],
        "study_subject": List[bridg.StudySubject],
    },
    total=False,
)


def structure(data: Dict[str, List[Any]]):
    root = bridg.converter.structure(data, Root)
    for values in root.values():
        for value in values:
            yield value


with open("dev/seed.yml") as f:
    data = yaml.load(f, yaml.FullLoader)
objects = structure(data)
session.add_all(objects)
session.commit()
session.close()
