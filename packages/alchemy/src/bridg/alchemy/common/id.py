from typing import Optional
from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, composite, declared_attr, mapped_column, relationship

from ..datatype import ConceptDescriptor, InstanceIdentifier
from ..db import Base


class ID(Base):
    __abstract__ = True

    @declared_attr
    def identifier(cls) -> Mapped[InstanceIdentifier]:
        return composite(
            mapped_column("identifier_root"),
            mapped_column("identifier_extension"),
        )

    identifier_type_code_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("concept_descriptor.id"))

    @declared_attr
    def identifier_type_code(cls) -> Mapped[Optional[ConceptDescriptor]]:
        return relationship(foreign_keys=cls.identifier_type_code_id)  # type: ignore
