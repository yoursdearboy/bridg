from typing import List
from uuid import UUID, uuid4

from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base
from .concept_descriptor import ConceptDescriptor


class CodeSystem(Base):
    __tablename__ = "code_system"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    concept: Mapped[List[ConceptDescriptor]] = relationship(back_populates="code_system", cascade="all, delete-orphan")
