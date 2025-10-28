from typing import Optional
from uuid import UUID, uuid4

from sqlalchemy import UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from ..datatypes import ConceptDescriptor as ConceptDescriptorBase
from ..db import Base


class ConceptDescriptor(ConceptDescriptorBase, Base):
    __tablename__ = "concept_descriptor"
    __table_args__ = (UniqueConstraint("code", "code_system"),)

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    code: Mapped[str]
    code_system: Mapped[str]
    display_name: Mapped[Optional[str]]
