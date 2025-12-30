from typing import Any, Dict, List, TypedDict

import yaml
from bridg.alchemy import (
    ConceptDescriptor,
    DefinedActivity,
    DefinedEligibilityCriterion,
    DefinedExclusionCriterion,
    DefinedInclusionCriterion,
    DefinedObservation,
    DefinedProcedure,
    DefinedSubstanceAdministration,
    HealthcareFacility,
    HealthcareProvider,
    HealthcareProviderGroup,
    Organization,
    PerformedActivity,
    Person,
    Study,
    StudySite,
    StudySubject,
    TerminologyService,
    converter,
)
from common.env import load_env
from common.settings import load_settings
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

Root = TypedDict(
    "Root",
    {
        "concept_descriptor": List[ConceptDescriptor],
        "defined_activity": List[DefinedActivity],
        "defined_eligibility_criterion": List[DefinedEligibilityCriterion],
        "defined_exclusion_criterion": List[DefinedExclusionCriterion],
        "defined_inclusion_criterion": List[DefinedInclusionCriterion],
        "defined_observation": List[DefinedObservation],
        "defined_procedure": List[DefinedProcedure],
        "defined_substance_administration": List[DefinedSubstanceAdministration],
        "organization": List[Organization],
        "performed_activity": List[PerformedActivity],
        "person": List[Person],
        "healthcare_facility": List[HealthcareFacility],
        "healthcare_provider": List[HealthcareProvider],
        "healthcare_provider_group": List[HealthcareProviderGroup],
        "study": List[Study],
        "study_site": List[StudySite],
        "study_subject": List[StudySubject],
    },
    total=False,
)


def structure(data: Dict[str, List[Any]]):
    root = converter.converter.structure(data, Root)
    for values in root.values():
        for value in values:
            yield value


def main():
    load_env()
    settings = load_settings()
    engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
    session = Session(engine)
    converter.terminology.set(TerminologyService(session))
    with open("dev/seed.yml") as f:
        data = yaml.load(f, yaml.FullLoader)
    objects = structure(data)
    session.add_all(objects)
    session.commit()
    session.close()


if __name__ == "__main__":
    main()
