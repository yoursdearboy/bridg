from __future__ import annotations

import enum
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import Enum, select
from sqlalchemy.orm import Mapped, Session, mapped_column

from .datatype import InstanceIdentifier
from .datatype.uid import UniqueIdentifierString
from .db import Base


class SequenceType(str, enum.Enum):
    PLAIN = "plain"
    TEMPLATE = "template"
    YEARLY = "yearly"


class Sequence(Base):
    __tablename__ = "sequence"

    name: Mapped[str] = mapped_column(primary_key=True)
    root: Mapped[Optional[str]]
    type: Mapped[SequenceType] = mapped_column(
        Enum(SequenceType, native_enum=False)
    )
    counter: Mapped[int] = mapped_column(default=0)
    template: Mapped[Optional[str]]
    updated_at: Mapped[Optional[datetime]]


class SequenceService:
    def __init__(self, session: Session) -> None:
        self.session = session

    def generate(self, name: str) -> InstanceIdentifier:
        """Atomically increment the named sequence and return an InstanceIdentifier.

        Uses SELECT FOR UPDATE (PostgreSQL) or SQLite's implicit write lock so the
        counter update rolls back with the surrounding transaction on failure.
        """
        seq = self.session.execute(
            select(Sequence)
            .where(Sequence.name == name)
            .with_for_update()
        ).scalar_one_or_none()

        if seq is None:
            raise ValueError(f"Sequence {name!r} not found")

        now = datetime.now(timezone.utc)

        if seq.type == SequenceType.YEARLY:
            if seq.updated_at is None or seq.updated_at.year != now.year:
                seq.counter = 1
            else:
                seq.counter += 1
            seq.updated_at = now
        else:
            seq.counter += 1

        value = _format(seq)
        root = UniqueIdentifierString(seq.root) if seq.root is not None else UniqueIdentifierString(value)
        extension = value if seq.root is not None else None
        return InstanceIdentifier(root=root, extension=extension)


def _format(seq: Sequence) -> str:
    if seq.type == SequenceType.PLAIN:
        return str(seq.counter)
    if seq.type == SequenceType.TEMPLATE:
        return seq.template.format(seq.counter)  # type: ignore[arg-type]
    if seq.type == SequenceType.YEARLY:
        assert seq.updated_at is not None
        return seq.template.format(year=seq.updated_at.year, i=seq.counter)  # type: ignore[arg-type]
    raise ValueError(f"Unknown type: {seq.type}")
