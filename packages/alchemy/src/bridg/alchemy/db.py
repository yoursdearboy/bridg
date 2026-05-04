from datetime import datetime

from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy_continuum import make_versioned

from .datatype.uid import UniqueIdentifierString
from .tz_date_time import TZDateTime

make_versioned(user_cls=None)


class Base(DeclarativeBase):
    type_annotation_map = {
        datetime: TZDateTime,
        UniqueIdentifierString: String,
    }
