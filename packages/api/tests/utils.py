from datetime import date, datetime, timezone
from enum import Enum
from typing import Any, Callable, Optional, TypeVar, overload

from bridg import (
    ConceptDescriptor,
    DataValue,
    EntityName,
    Epoch,
    IntervalPointInTime,
    PerformedObservationResult,
    Person,
    PhysicalQuantity,
    StudySite,
    StudySubject,
)

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


def omit_recursively(keys: Any, x: dict) -> dict:
    def f(x: Any):
        match x:
            case dict():
                return {k: f(v) for k, v in omit(keys, x).items()}
            case list():
                return [f(e) for e in x]
            case _:
                return x

    return f(x)  # type: ignore


def omit_id(x: dict) -> dict:
    return omit_recursively(["id"], x)


def enum_str(x: Enum) -> Any:
    return x.value


def date_str(x: date) -> str:
    return x.isoformat()


def datetime_str(x: datetime) -> str:
    return x.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%fZ")


# FIXME: drop in favour of snapshots


def ivl_ts_dict(x: IntervalPointInTime):
    return {
        "data_type_name": "IVL[TS]",
        "high": _or(datetime_str, x.high),
        "low": _or(datetime_str, x.low),
    }


def cd_dict(x: ConceptDescriptor):
    return {
        "data_type_name": "CD",
        "code": x.code,
        "code_system": x.code_system,
        "display_name": x.display_name,
    }


def datavalue_dict(x: DataValue):
    match x:
        case ConceptDescriptor():
            return {
                "data_type_name": "CD",
                "code": x.code,
                "code_system": x.code_system,
                "display_name": x.display_name,
            }
        case PhysicalQuantity():
            return {"data_type_name": "PQ", "value": float(x.value), "unit": x.unit}  # type: ignore
        case datetime():
            return {"data_type_name": "TS.DATETIME", "value": datetime_str(x)}
        case date():
            return {"data_type_name": "TS.DATE", "value": date_str(x)}
        case str():
            return {"data_type_name": "ST", "value": x}


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


def person_dict(x: Person):
    return {
        "id": str(x.id),
        "administrative_gender_code": _or(enum_str, x.administrative_gender_code),
        "birth_date": _or(date_str, x.birth_date),
        "death_date": _or(date_str, x.death_date),
        "death_date_estimated_indicator": x.death_date_estimated_indicator,
        "death_indicator": x.death_indicator,
        "primary_name": _or(entity_name_dict, x.primary_name),
    }


def study_subject_dict(x: StudySubject):
    return {
        "id": _or(str, x.id),
        "status": _or(enum_str, x.status),
        "status_date": _or(datetime_str, x.status_date),
        "performing_biologic_entity": _or(person_dict, x.performing_biologic_entity),
        "performing_organization": None,
    }


def studysite_dict(x: StudySite):
    return {
        "id": str(x.id),
        "label": str(x.performing_healthcare_facility or x.performing_organization),
    }


def epoch_dict(x: Epoch):
    return {
        "id": str(x.id),
        "name": x.name,
        "type_code": x.type_code,
        "description": x.description,
    }


def performed_observation_result_dict(x: PerformedObservationResult):
    return {
        "id": str(x.id),
        "value": _or(datavalue_dict, x.value),
        "type_code": _or(cd_dict, x.type_code),
        "value_null_flavor_reason": x.value_null_flavor_reason,
        "baseline_indicator": x.baseline_indicator,
        "derived_indicator": x.derived_indicator,
        "created_date": _or(datetime_str, x.created_date),
        "reported_date": _or(datetime_str, x.reported_date),
        "comment": x.comment,
    }
