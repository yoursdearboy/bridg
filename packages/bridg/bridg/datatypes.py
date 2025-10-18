from __future__ import annotations

from typing import Dict, Optional, Type


class DataValue:
    dataType: DataType

    def dict(self):
        return {"dataType": self.dataType, **self.__dict__}


class DataType(DataValue):
    shortName: str
    longName: str

    def __init__(self, shortName: str, longName: str) -> None:
        self.shortName = shortName
        self.longName = longName

    def __str__(self) -> str:
        return f"{self.longName} ({self.shortName})"


DataValue.dataType = DataType("ANY", "DataValue")
DataType.dataType = DataType("TYPE", "DataType")


class Boolean(DataValue):
    value: bool
    dataType = DataType("BL", "Boolean")


class EncapsulatedData(DataValue):
    data: bytes
    dataType = DataType("ED", "EncapsulatedData")


class CharacterString(EncapsulatedData):
    data: str
    dataType = DataType("ST", "CharacterString")

    def __init__(self, data: str) -> None:
        self.data = data


class StringNoTranslations(CharacterString):
    dataType = DataType("ST.NT", "StringNoTranslations")


class StringSimple(StringNoTranslations):
    dataType = DataType("ST.SIMPLE", "StringSimple")


class UniqueIdentifierString(StringSimple):
    dataType = DataType("UID", "UniqueIdentifierString")


class ConceptDescriptor(DataValue):
    dataType = DataType("CD", "ConceptDescriptor")
    code: Optional[StringSimple]
    codeSystem: Optional[UniqueIdentifierString]
    codeSystemName: Optional[StringNoTranslations]
    codeSystemVersion: Optional[StringSimple]
    valueSet: Optional[UniqueIdentifierString]
    valueSetVersion: Optional[StringSimple]
    displayName: Optional[CharacterString]

    def __init__(
        self,
        code=None,
        codeSystem=None,
        codeSystemName=None,
        codeSystemVersion=None,
        valueSet=None,
        valueSetVersion=None,
        displayName=None,
    ) -> None:
        self.code = code
        self.codeSystem = codeSystem
        self.codeSystemName = codeSystemName
        self.codeSystemVersion = codeSystemVersion
        self.valueSet = valueSet
        self.valueSetVersion = valueSetVersion
        self.displayName = displayName


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
    value: int


class RealNumber(ZeroedQuantity):
    dataType = DataType("REAL", "RealNumber")
    value: float


class PhysicalQuantity(ZeroedQuantity):
    dataType = DataType("PQ", "PhysiqalQuantity")
    value: Optional[float]
    unit: Optional[CodedSimpleValue]

    def __init__(self, value=None, unit=None) -> None:
        self.value = value
        self.unit = unit


class PointInTime(Quantity):
    dataType = DataType("TS", "PointInTime")


class Date(PointInTime):
    dataType = DataType("TS.DATE", "Date")


class DateTime(Date):
    dataType = DataType("TS.DATETIME", "DateTime")


DATATYPE_TO_CLASS: Dict[DataType, Type[DataValue]] = {
    DataValue.dataType: DataValue,
    DataType.dataType: DataType,
    Boolean.dataType: Boolean,
    EncapsulatedData.dataType: EncapsulatedData,
    CharacterString.dataType: CharacterString,
    StringNoTranslations.dataType: StringNoTranslations,
    StringSimple.dataType: StringSimple,
    UniqueIdentifierString.dataType: UniqueIdentifierString,
    ConceptDescriptor.dataType: ConceptDescriptor,
    CodedValue.dataType: CodedValue,
    CodedSimpleValue.dataType: CodedSimpleValue,
    Quantity.dataType: Quantity,
    ZeroedQuantity.dataType: ZeroedQuantity,
    IntegerNumber.dataType: IntegerNumber,
    RealNumber.dataType: RealNumber,
    PhysicalQuantity.dataType: PhysicalQuantity,
    PointInTime.dataType: PointInTime,
    Date.dataType: Date,
    DateTime.dataType: DateTime,
}
