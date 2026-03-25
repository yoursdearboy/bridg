import strawberry

from .biospecimen import (
    PerformedSpecimenMoveQuery,
    SpecimenQuery,
)
from .code_system import CodeSystemQuery
from .common import (
    PersonQuery,
    StudySubjectQuery,
    SubjectQuery,
)
from .protocol import (
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
    PersonQuery,
    CodeSystemQuery,
): ...
