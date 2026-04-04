from typing import Optional

import strawberry

from .defined_activity import DefinedActivityInterface


@strawberry.type
class StudyActivity:
    id: strawberry.ID

    study_focus_indicator: Optional[bool]

    # using_study_protocol_version: Optional[StudyProtocolVersion]

    used_defined_activity: DefinedActivityInterface
