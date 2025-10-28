from sqlalchemy import TypeDecorator
from sqlalchemy import types as satypes

from hl7.datatypes import DATA_TYPE_TO_TYPE, DataValue


class DataValueDecorator(TypeDecorator):
    impl = satypes.JSON

    cache_ok = True

    def process_bind_param(self, value: DataValue | None, dialect) -> dict | None:
        if value is None:
            return None
        data = value.__dict__
        data["data_type"] = value.data_type
        return data

    def process_result_value(self, value: dict | None, dialect) -> DataValue | None:
        if value is None:
            return None
        data_type = value.pop("data_type")
        cls = DATA_TYPE_TO_TYPE[data_type]
        return cls(**value)
