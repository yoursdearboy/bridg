from typing import Literal, Optional, Union
from uuid import UUID

import bridg
from pydantic import field_validator

from api.base_model import BaseModel


class DataValue(BaseModel):
    data_type: Literal["ANY"]


class EncapsulatedData(DataValue):
    data_type: Literal["ED"]


class CharacterString(EncapsulatedData):
    data_type: Literal["ST"]


class ConceptDescriptor(DataValue):
    data_type: Literal["CD"] = "CD"
    # FIXME: code not optional
    code: str = None
    code_system: UUID
    display_name: Optional[str] = None

    @field_validator("code_system", mode="before")
    @classmethod
    def validate_code_system(cls, cs: bridg.CodeSystem | UUID) -> UUID:
        if isinstance(cs, bridg.CodeSystem):
            return cs.id
        return cs


class CodedValue(ConceptDescriptor):
    data_type: Literal["CV"] = "CV"


class CodedSimpleValue(CodedValue):
    data_type: Literal["CS"] = "CS"


class StringNoTranslations(CharacterString):
    data_type: Literal["ST.NT"]


class StringSimple(StringNoTranslations):
    data_type: Literal["ST.SIMPLE"]


class Quantity(DataValue):
    data_type: Literal["QTY"]


class ZeroedQuantity(Quantity):
    data_type: Literal["QTZ"]


class IntegerNumber(ZeroedQuantity):
    data_type: Literal["INT"]


class RealNumber(ZeroedQuantity):
    data_type: Literal["REAL"]


# FIXME: add value (not optional)
class PhysicalQuantity(ZeroedQuantity):
    data_type: Literal["PQ"]
    unit: Optional[str]


class PointInTime(Quantity):
    data_type: Literal["TS"]


class Date(PointInTime):
    data_type: Literal["TS.DATE"]


class DateTime(Date):
    data_type: Literal["TS.DATETIME"]


DataValueUnion = Union[
    DataValue,
    EncapsulatedData,
    CharacterString,
    ConceptDescriptor,
    CodedValue,
    CodedSimpleValue,
    StringNoTranslations,
    StringSimple,
    Quantity,
    ZeroedQuantity,
    IntegerNumber,
    RealNumber,
    PhysicalQuantity,
    PointInTime,
    Date,
    DateTime,
]
