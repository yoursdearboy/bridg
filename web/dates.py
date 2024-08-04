import datetime
import re
from typing import Literal, TypeAlias

from babel import Locale
from babel.dates import (
    LC_TIME,
    ParseError,
    get_date_format,
    get_datetime_format,
    get_time_format,
)

_PredefinedTimeFormat: TypeAlias = Literal["full", "long", "medium", "short"]


def parse_date(
    string: str,
    locale: Locale | str | None = LC_TIME,
    format: _PredefinedTimeFormat = "medium",
) -> datetime.date:
    numbers = re.findall(r"(\d+)", string)
    if not numbers:
        raise ParseError("No numbers were found in input")

    format_str = get_date_format(format=format, locale=locale).pattern.lower()
    year_idx = format_str.index("y")
    month_idx = format_str.index("m")
    if month_idx < 0:
        month_idx = format_str.index("l")
    day_idx = format_str.index("d")

    indexes = sorted([(year_idx, "Y"), (month_idx, "M"), (day_idx, "D")])
    indexes = {item[1]: idx for idx, item in enumerate(indexes)}

    # FIXME: this currently only supports numbers, but should also support month
    #        names, both in the requested locale, and english

    year = numbers[indexes["Y"]]
    if len(year) == 2:
        year = 2000 + int(year)
    elif len(year) == 4:
        year = int(year)
    else:
        raise ParseError()
    month = int(numbers[indexes["M"]])
    day = int(numbers[indexes["D"]])
    return datetime.date(year, month, day)


def parse_time(
    string: str,
    locale: Locale | str | None = LC_TIME,
    format: _PredefinedTimeFormat = "medium",
) -> datetime.time:
    """Parse a time from a string.

    This function uses the time format for the locale as a hint to determine
    the order in which the time fields appear in the string.

    >>> parse_time('15:30:00', locale='en_US')
    datetime.time(15, 30)

    :param string: the string containing the time
    :param locale: a `Locale` object or a locale identifier
    :param format: the format to use (see ``get_time_format``)
    :return: the parsed time
    :rtype: `time`
    """
    numbers = re.findall(r"(\d+)", string)
    if not numbers:
        raise ParseError("No numbers were found in input")

    format_str = get_time_format(format=format, locale=locale).pattern.lower()
    hour_idx = format_str.index("h")
    if hour_idx < 0:
        hour_idx = format_str.index("k")
    min_idx = format_str.index("m")
    sec_idx = format_str.index("s")

    indexes = sorted([(hour_idx, "H"), (min_idx, "M"), (sec_idx, "S")])
    indexes = {item[1]: idx for idx, item in enumerate(indexes)}

    # TODO: support time zones

    # Check if the format specifies a period to be used;
    # if it does, look for 'pm' to figure out an offset.
    hour_offset = 0
    if "a" in format_str and "pm" in string.lower():
        hour_offset = 12

    # Parse up to three numbers from the string.
    minute = second = 0
    hour = int(numbers[indexes["H"]]) + hour_offset
    if len(numbers) > 1:
        minute = int(numbers[indexes["M"]])
        if len(numbers) > 2:
            second = int(numbers[indexes["S"]])
    return datetime.time(hour, minute, second)


def parse_datetime(
    string: str,
    locale: Locale | str | None = LC_TIME,
    format: _PredefinedTimeFormat = "medium",
) -> datetime.datetime:
    numbers = re.findall(r"(\d+)", string)
    if not numbers:
        raise ParseError("No numbers were found in input")

    format_str = get_datetime_format(format=format, locale=locale).pattern.lower()
    year_idx = format_str.index("y")
    month_idx = format_str.index("m")
    if month_idx < 0:
        month_idx = format_str.index("l")
    day_idx = format_str.index("d")
    hour_idx = format_str.index("h")
    if hour_idx < 0:
        hour_idx = format_str.index("k")
    min_idx = format_str.index("m")
    sec_idx = format_str.index("s")

    indexes = sorted(
        [
            (year_idx, "Y"),
            (month_idx, "M"),
            (day_idx, "D"),
            (hour_idx, "H"),
            (min_idx, "M"),
            (sec_idx, "S"),
        ]
    )
    indexes = {item[1]: idx for idx, item in enumerate(indexes)}

    year = numbers[indexes["Y"]]
    if len(year) == 2:
        year = 2000 + int(year)
    elif len(year) == 4:
        year = int(year)
    else:
        raise ParseError()
    month = int(numbers[indexes["M"]])
    day = int(numbers[indexes["D"]])

    hour_offset = 0
    if "a" in format_str and "pm" in string.lower():
        hour_offset = 12

    minute = second = 0
    hour = int(numbers[indexes["H"]]) + hour_offset
    if len(numbers) > 1:
        minute = int(numbers[indexes["M"]])
        if len(numbers) > 2:
            second = int(numbers[indexes["S"]])

    return datetime.datetime(year, month, day, hour, minute, second)
