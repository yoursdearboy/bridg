import datetime

from sqlalchemy import DateTime, TypeDecorator


class TZDateTime(TypeDecorator):
    impl = DateTime
    cache_ok = True

    def process_bind_param(self, value, dialect):
        if value is not None:
            # The implementation from SQLAlchemy recipe.
            # if not value.tzinfo or value.tzinfo.utcoffset(value) is None:
            #     raise TypeError("tzinfo is required")
            # value = value.astimezone(datetime.timezone.utc).replace(tzinfo=None)

            # Simplified one allowing naive datetime.
            if value.tzinfo:
                value = value.astimezone(datetime.timezone.utc).replace(tzinfo=None)
        return value

    def process_result_value(self, value, dialect):
        if value is not None:
            value = value.replace(tzinfo=datetime.timezone.utc)
        return value
