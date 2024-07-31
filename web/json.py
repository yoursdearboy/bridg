from datetime import date, datetime
from typing import Any

from flask.json.provider import DefaultJSONProvider


class MyJSONProvider(DefaultJSONProvider):
    def default(self, o: Any):
        if isinstance(o, date):
            return o.isoformat()
        if isinstance(o, datetime):
            return o.isoformat()
        return super().default(o)
