import datetime

from babel import Locale
from babel.dates import format_date, format_datetime
from flask_babel import LazyString, get_locale
from flask_babel import lazy_gettext as _


def bool_filter(
    x: bool | None, yes=_("Yes"), no=_("No"), none=_("-")
) -> str | LazyString:
    if x is None:
        return none
    elif x:
        return yes
    else:
        return no


def date_filter(
    date: datetime.date | None = None,
    format: str = "medium",
    locale: Locale | str | None = None,
    default: str = "",
) -> str:
    if date is None:
        return default
    if locale is None:
        locale = get_locale()
    return format_date(date, format, locale)


def datetime_filter(
    datetime: datetime.datetime | None = None,
    format: str = "medium",
    tzinfo: datetime.tzinfo | None = None,
    locale: Locale | str | None = None,
    default: str = "",
) -> str:
    if datetime is None:
        return default
    if locale is None:
        locale = get_locale()
    return format_datetime(datetime, format, tzinfo, locale)
