import strawberry

from .biospecimen import (
    PerformedSpecimenMoveQuery,
    SpecimenQuery,
)
from .code_system import CodeSystemQuery
from .common import (
    OrganizationQuery,
    PersonQuery,
    PlaceQuery,
    StudySubjectQuery,
    SubjectQuery,
)
from .protocol import (
    DefinedActivityQuery,
    StudyProtocolVersionQuery,
)
from .study import (
    PerformedActivityQuery,
    PerformedEncounterQuery,
    PerformedSpecimenCollectionQuery,
)


@strawberry.type
class Query(
    PerformedSpecimenMoveQuery,
    PerformedSpecimenCollectionQuery,
    PerformedEncounterQuery,
    PerformedActivityQuery,
    SpecimenQuery,
    StudyProtocolVersionQuery,
    StudySubjectQuery,
    SubjectQuery,
    PlaceQuery,
    OrganizationQuery,
    PersonQuery,
    DefinedActivityQuery,
    CodeSystemQuery,
): ...
