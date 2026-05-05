from datetime import datetime

from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase

from .datatype.uid import UniqueIdentifierString
from .tz_date_time import TZDateTime

try:
    from sqlalchemy_continuum import make_versioned

    # set your own or built-in user_cls in your configuration code
    make_versioned(user_cls=None)  # type: ignore
except ImportError:
    pass


class Base(DeclarativeBase):
    type_annotation_map = {
        datetime: TZDateTime,
        UniqueIdentifierString: String,
    }
