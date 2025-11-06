from typing import Any, Dict, List, TypedDict

import bridg
import bridg.converter
import yaml

from .db import SessionLocal

session = SessionLocal()

bridg.converter.cd_service.set(bridg.datatype.ConceptDescriptorService(session))

Root = TypedDict(
    "Root",
    {
        "concept_descriptor": List[bridg.datatype.ConceptDescriptor],
        "defined_activity": List[bridg.DefinedActivity],
        "defined_eligibility_criterion": List[bridg.DefinedEligibilityCriterion],
        "defined_exclusion_criterion": List[bridg.DefinedExclusionCriterion],
        "defined_inclusion_criterion": List[bridg.DefinedInclusionCriterion],
        "defined_observation": List[bridg.DefinedObservation],
        "defined_procedure": List[bridg.DefinedProcedure],
        "defined_substance_administration": List[bridg.DefinedSubstanceAdministration],
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
    root = bridg.converter.converter.structure(data, Root)
    for values in root.values():
        for value in values:
            yield value


def main():
    with open("dev/seed.yml") as f:
        data = yaml.load(f, yaml.FullLoader)
    objects = structure(data)
    session.add_all(objects)
    session.commit()
    session.close()


if __name__ == "__main__":
    main()
