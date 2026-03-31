from dataclasses import dataclass
from typing import Optional, Self


@dataclass
class ConceptDescriptor:
    code: str
    code_system: str
    display_name: Optional[str]

    @classmethod
    def serialize(cls, x: Self) -> dict:
        return {
            "code": x.code,
            "codeSystem": x.code_system,
            "displayName": x.display_name,
        }

    @classmethod
    def parse_value(cls, x: dict) -> Self:
        return cls(x["code"], x["codeSystem"], x.get("displayName"))

