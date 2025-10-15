from __future__ import annotations

from typing import Dict, Literal, Type


class DataValue:
    dataType: DataType


class DataType(DataValue):
    shortName: str
    longName: str

    def __init__(self, shortName: str, longName: str) -> None:
        self.shortName = shortName
        self.longName = longName


DataValue.dataType = DataType("ANY", "DataValue")
DataType.dataType = DataType("TYPE", "DataType")


class Boolean(DataValue):
    dataType = DataType("BL", "Boolean")


class EncapsulatedData(DataValue):
    dataType = DataType("ED", "EncapsulatedData")
    # mediaType:


class CharacterString(EncapsulatedData):
    dataType = DataType("ST", "CharacterString")


class StringNoTranslations(CharacterString):
    dataType = DataType("ST.NT", "StringNoTranslations")


class StringSimple(StringNoTranslations):
    dataType = DataType("ST.SIMPLE", "StringSimple")


class UniqueIdentifierString(StringSimple):
    dataType = DataType("UID", "UniqueIdentifierString")


class ConceptDescriptor(DataValue):
    dataType = DataType("CD", "ConceptDescriptor")
    code: StringSimple
    codeSystem: UniqueIdentifierString
    codeSystemName: StringNoTranslations
    codeSystemVersion: StringSimple
    valueSet: UniqueIdentifierString
    valueSetVersion: StringSimple
    displayName: CharacterString


class CodedValue(ConceptDescriptor):
    dataType = DataType("CV", "CodedValue")


class CodedSimpleValue(CodedValue):
    dataType = DataType("CS", "CodedSimpleValue")


class Quantity(DataValue):
    dataType = DataType("QTY", "Quantity")


class ZeroedQuantity(Quantity):
    dataType = DataType("QTZ", "ZeroedQuantity")


class IntegerNumber(ZeroedQuantity):
    dataType = DataType("INT", "IntegerNumber")


class RealNumber(ZeroedQuantity):
    dataType = DataType("REAL", "RealNumber")


class PhysicalQuantity(ZeroedQuantity):
    dataType = DataType("PQ", "PhysiqalQuantity")


class PointInTime(Quantity):
    dataType = DataType("TS", "PointInTime")


class Date(PointInTime):
    dataType = DataType("TS.DATE", "Date")


class DateTime(Date):
    dataType = DataType("TS.DATETIME", "DateTime")


SYMBOL = Literal["ANY", "TYPE", "BL", "ED", "ST", "QTY", "QTZ", "INT", "REAL", "PQ", "TS", "TS.DATE", "TS.DATETIME"]
SYMBOL_TO_CLASS: Dict[SYMBOL, Type[DataValue]] = {
    "ANY": DataValue,
    "TYPE": DataType,
    "BL": Boolean,
    "ED": EncapsulatedData,
    "ST": CharacterString,
    "QTY": Quantity,
    "QTZ": ZeroedQuantity,
    "INT": IntegerNumber,
    "REAL": RealNumber,
    "PQ": PhysicalQuantity,
    "TS": PointInTime,
    "TS.DATE": Date,
    "TS.DATETIME": DateTime,
}
