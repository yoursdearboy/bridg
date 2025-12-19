from __future__ import annotations

from datetime import date
from typing import Optional
from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..datatype import ConceptDescriptor
from .material import Material


class Product(Material):
    """
    DEFINITION:
    A material produced by or resulting from a process.

    EXAMPLE(S):
    animal and human drugs; therapeutic biologics; allergenics; cell, tissue and gene therapy products; blood components; blood derivative products; devices; animal (pets and livestock) and human food/feed (medicated and un-medicated); cosmetics; pet treats; dietary supplements [examples from FDA's list of regulated products]

    Therapeutic devices, software programs, diagnostic or storage equipment, pill bottle, tube rack

    Natural or Synthesized DNA

    The HeLa cell line, the HEK-293 cell line

    OTHER NAME(S):

    NOTE(S):
    The term “Product” as a class name in BRIDG is not intended to imply commercial products only, but rather any material that is produced by a process. This includes biologics collected for testing, transplant or replication, as well as tissue that is banked.
    """

    __mapper_args__ = {"polymorphic_identity": "product"}

    type_code_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("concept_descriptor.id"))
    type_code: Mapped[Optional[ConceptDescriptor]] = relationship(foreign_keys=type_code_id)

    lot_number_text: Mapped[Optional[str]]
    expiration_date: Mapped[Optional[date]]
