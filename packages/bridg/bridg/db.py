from datetime import datetime

from sqlalchemy.orm import DeclarativeBase

from .tz_date_time import TZDateTime


class Base(DeclarativeBase):
    type_annotation_map = {
        datetime: TZDateTime,
    }
