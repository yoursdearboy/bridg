from datetime import datetime

from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase

from .datatype.uid import UniqueIdentifierString
from .tz_date_time import TZDateTime


class Base(DeclarativeBase):
    type_annotation_map = {
        datetime: TZDateTime,
        UniqueIdentifierString: String,
    }
