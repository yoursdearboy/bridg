from typing import Optional


class DataValue:
    data_type = "ANY"


class EncapsulatedData(DataValue):
    data_type = "ED"


class CharacterString(EncapsulatedData):
    data_type = "ST"


class StringNoTranslations(CharacterString):
    data_type = "ST.NT"


class StringSimple(StringNoTranslations):
    data_type = "ST.SIMPLE"


class Quantity(DataValue):
    data_type = "QTY"


class ZeroedQuantity(Quantity):
    data_type = "QTZ"


class IntegerNumber(ZeroedQuantity):
    data_type = "INT"


class RealNumber(ZeroedQuantity):
    data_type = "REAL"


class PhysicalQuantity(ZeroedQuantity):
    data_type = "PQ"
    unit: Optional[str]

    def __init__(self, unit: Optional[str] = None):
        super().__init__()
        self.unit = unit


class PointInTime(Quantity):
    data_type = "TS"


class Date(PointInTime):
    data_type = "TS.DATE"


class DateTime(Date):
    data_type = "TS.DATETIME"


DATA_TYPE_TO_TYPE: dict[str, type[DataValue]] = {
    "ANY": DataValue,
    "ED": EncapsulatedData,
    "ST": CharacterString,
    "ST.NT": StringNoTranslations,
    "ST.SIMPLE": StringSimple,
    "QTY": Quantity,
    "QTZ": ZeroedQuantity,
    "INT": IntegerNumber,
    "REAL": RealNumber,
    "PQ": PhysicalQuantity,
    "TS": PointInTime,
    "TS.DATE": Date,
    "TS.DATETIME": DateTime,
}
