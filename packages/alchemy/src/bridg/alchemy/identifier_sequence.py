from __future__ import annotations

import enum
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import Enum, select
from sqlalchemy.orm import Mapped, Session, mapped_column

from .datatype import InstanceIdentifier
from .datatype.uid import UniqueIdentifierString
from .db import Base


class IdentifierSequenceType(str, enum.Enum):
    PLAIN = "plain"
    TEMPLATE = "template"
    YEARLY = "yearly"


class IdentifierSequence(Base):
    __tablename__ = "identifier_sequence"

    name: Mapped[str] = mapped_column(primary_key=True)
    root: Mapped[Optional[str]]
    type: Mapped[IdentifierSequenceType] = mapped_column(
        Enum(IdentifierSequenceType, native_enum=False)
    )
    counter: Mapped[int] = mapped_column(default=0)
    template: Mapped[Optional[str]]
    updated_at: Mapped[Optional[datetime]]


def generate_identifier(session: Session, sequence_name: str) -> InstanceIdentifier:
    """Atomically increment the named sequence and return an InstanceIdentifier.

    Uses SELECT FOR UPDATE (PostgreSQL) or SQLite's implicit write lock so the
    counter update rolls back with the surrounding transaction on failure.
    """
    seq = session.execute(
        select(IdentifierSequence)
        .where(IdentifierSequence.name == sequence_name)
        .with_for_update()
    ).scalar_one_or_none()

    if seq is None:
        raise ValueError(f"Identifier sequence {sequence_name!r} not found")

    now = datetime.now(timezone.utc)

    if seq.type == IdentifierSequenceType.YEARLY:
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


def _format(seq: IdentifierSequence) -> str:
    if seq.type == IdentifierSequenceType.PLAIN:
        return str(seq.counter)
    if seq.type == IdentifierSequenceType.TEMPLATE:
        return seq.template.format(seq.counter)  # type: ignore[arg-type]
    if seq.type == IdentifierSequenceType.YEARLY:
        assert seq.updated_at is not None
        return seq.template.format(year=seq.updated_at.year, i=seq.counter)  # type: ignore[arg-type]
    raise ValueError(f"Unknown type: {seq.type}")
