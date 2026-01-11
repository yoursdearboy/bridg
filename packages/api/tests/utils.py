from datetime import date, datetime, timezone
from enum import Enum
from typing import Any, Callable, Optional, TypeVar, overload

from bridg.alchemy import ID, EntityName, Person, StudySubject

T = TypeVar("T")
R = TypeVar("R")


@overload
def _or(f: Callable[[T], R], x: Optional[T], *args, default: Optional[R] = None) -> Optional[R]: ...


@overload
def _or(f: Callable[[T], R], default: Optional[R] = None) -> Callable[[Optional[T]], Optional[R]]: ...


def _or(
    f: Callable[[T], R], *args, default: Optional[R] = None, **kwargs
) -> Callable[[Optional[T]], Optional[R]] | Optional[R]:
    def g(x: Optional[T]) -> Optional[R]:
        if x is None:
            return default
        return f(x)

    if len(args) == 1:
        return g(args[0])

    return g


def omit(keys: Any, x: dict) -> dict:
    if not isinstance(keys, list):
        keys = [keys]
    return {k: v for k, v in x.items() if k not in keys}


def enum_str(x: Enum) -> Any:
    return x.value


def date_str(x: date) -> str:
    return x.isoformat()


def datetime_str(x: datetime) -> str:
    return x.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%fZ")


def entity_name_dict(x: EntityName):
    return {
        "id": str(x.id),
        "use": x.use,
        "family": x.family,
        "given": x.given,
        "middle": x.middle,
        "patronymic": x.patronymic,
        "prefix": x.prefix,
        "suffix": x.suffix,
        "label": f"{x.given} {x.family}",
    }


def identifier_dict(x: ID):
    return {
        "identifier": {
            "root": x.identifier.root,
            "extension": x.identifier.extension,
        },
        "identifier_type_code": {
            "code": x.identifier_type_code.code,
            "code_system": x.identifier_type_code.code_system,
            "data_type_name": "CD",
            "display_name": x.identifier_type_code.display_name,
        }
        if x.identifier_type_code
        else None,
    }


def person_dict(x: Person):
    return {
        "id": str(x.id),
        "administrative_gender_code": _or(enum_str, x.administrative_gender_code),
        "birth_date": _or(date_str, x.birth_date),
        "death_date": _or(date_str, x.death_date),
        "death_date_estimated_indicator": x.death_date_estimated_indicator,
        "death_indicator": x.death_indicator,
        "primary_name": _or(entity_name_dict, next(iter(x.name), None)),
        "identifier": [identifier_dict(id) for id in x.identifier],
    }


def study_subject_dict(x: StudySubject):
    return {
        "id": _or(str, x.id),
        "status": _or(enum_str, x.status),
        "status_date": _or(datetime_str, x.status_date),
        "performing_biologic_entity": _or(person_dict, x.performing_biologic_entity),
        "performing_organization": None,
    }
