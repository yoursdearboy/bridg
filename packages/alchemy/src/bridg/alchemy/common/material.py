from __future__ import annotations

from typing import TYPE_CHECKING, List, Optional
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, composite, mapped_column, relationship

from ..datatype import ConceptDescriptor, PhysicalQuantity
from ..db import Base
from .id import ID

if TYPE_CHECKING:
    from ..biospecimen import Specimen


class Material(Base):
    """
    DEFINITION:
    A physical substance or system.

    EXAMPLE(S):
    drugs such as aspirin
    devices such as pacemakers or freezers
    systems such as software programs
    biologics such as blood
    food products such as broccoli
    cosmetics such as lipstick
    containers such as a blister pack or a test tube

    OTHER NAME(S):

    NOTE(S):
    Materials may be naturally occurring or may be made by natural or engineered processes.
    """

    __tablename__ = "material"
    __mapper_args__ = {"concrete": True, "polymorphic_identity": "material", "polymorphic_on": "type"}

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    type: Mapped[str]

    identifier: Mapped[List[MaterialIdentifier]] = relationship(back_populates="material", cascade="all, delete-orphan")

    code_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("concept_descriptor.id"))
    code: Mapped[Optional[ConceptDescriptor]] = relationship(foreign_keys=code_id)

    form_code_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("concept_descriptor.id"))
    form_code: Mapped[Optional[ConceptDescriptor]] = relationship(foreign_keys=form_code_id)

    description: Mapped[Optional[str]]

    quantity: Mapped[Optional[PhysicalQuantity]] = composite(
        lambda value, unit: PhysicalQuantity(value, unit) if value is not None else None,
        mapped_column("quantity_value", Numeric, nullable=True),
        mapped_column("quantity_unit", String, nullable=True),
    )

    performed_specimen: Mapped[Optional[Specimen]] = relationship(back_populates="performing_material")


class MaterialIdentifier(ID):
    __tablename__ = "material_identifier"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    material_id: Mapped[UUID] = mapped_column(ForeignKey("material.id"))
    material: Mapped[Material] = relationship(back_populates="identifier")
