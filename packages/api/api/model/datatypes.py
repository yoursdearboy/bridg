from typing import Literal, Optional, Union

from api.base_model import BaseModel


class DataValue(BaseModel):
    data_type: Literal["ANY"]


class EncapsulatedData(DataValue):
    data_type: Literal["ED"]


class CharacterString(EncapsulatedData):
    data_type: Literal["ST"]


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
