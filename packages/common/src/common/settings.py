import os
from dataclasses import dataclass
from typing import Any


@dataclass
class Settings:
    SQLALCHEMY_DATABASE_URI: str


def _pick(data, keys):
    return {k: v for k, v in data.items() if k in keys}


def _from_data(data: dict[str, Any]):
    return Settings(**_pick(data, Settings.__dataclass_fields__.keys()))


def _from_env(prefix: str = ""):
    return _from_data({k.removeprefix(f"{prefix}_"): v for k, v in os.environ.items()})


def load_settings(prefix: str = "BRIDG"):
    return _from_env(prefix=prefix)
