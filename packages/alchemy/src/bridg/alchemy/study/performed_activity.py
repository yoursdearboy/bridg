from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, composite, mapped_column, relationship

from ..common import Activity, StudySubject
from ..datatype import ConceptDescriptor, IntervalPointInTime
from ..protocol import DefinedActivity, Epoch, StudyProtocolVersion
from ..tz_date_time import TZDateTime


class PerformedActivity(Activity):
    __tablename__ = "performed_activity"
    __mapper_args__ = {"concrete": True, "polymorphic_identity": "activity", "polymorphic_on": "type"}

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    type: Mapped[str]

    repetition_number: Mapped[Optional[int]]
    name_code_modified_text: Mapped[Optional[str]]

    # FIXME: convert to optional
    # see https://github.com/abdulrahman305/sqlalchemy/commit/071abbb8636d81ff0c9a4ea8b8a972e63cf5ef54#diff-d54af7d55637bc92aefa7c48b51e08b36fa6cd7ae0adc5461d06638e438d08cbR331-R335
    date_range: Mapped[Optional[IntervalPointInTime]] = composite(
        lambda x, y: IntervalPointInTime(x, y) if x is not None or y is not None else None,
        mapped_column("date_range_low", TZDateTime, nullable=True),
        mapped_column("date_range_high", TZDateTime, nullable=True),
    )

    negation_indicator: Mapped[Optional[bool]]
    negation_reason_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("concept_descriptor.id"))
    negation_reason: Mapped[Optional[ConceptDescriptor]] = relationship(foreign_keys=negation_reason_id)

    status_code_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("concept_descriptor.id"))
    status_code: Mapped[Optional[ConceptDescriptor]] = relationship(foreign_keys=status_code_id)

    status_date: Mapped[Optional[datetime]]

    containing_epoch_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("epoch.id"))
    containing_epoch: Mapped[Optional[Epoch]] = relationship()
    """
    Each PerformedActivity might be contained by one Epoch.
    Each Epoch might contain one or more PerformedActivity.
    """

    executing_study_protocol_version_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("study_protocol_version.id"))
    executing_study_protocol_version: Mapped[Optional[StudyProtocolVersion]] = relationship()
    """
    Each PerformedActivity might execute under one StudyProtocolVersion.
    Each StudyProtocolVersion might be executed by one or more PerformedActivity.
    """

    instantiated_defined_activity_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("defined_activity.id"))
    instantiated_defined_activity: Mapped[Optional[DefinedActivity]] = relationship()
    """
    Each PerformedActivity might instantiate one DefinedActivity.
    Each DefinedActivity might be instantiated by one or more PerformedActivity.
    """

    involved_subject_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("study_subject.id"))
    involved_subject: Mapped[Optional[StudySubject]] = relationship(back_populates="involving_performed_activity")
    """
    Each Activity might be participated in by one Subject.
    Each Subject might participate in one or more Activity.
    """
