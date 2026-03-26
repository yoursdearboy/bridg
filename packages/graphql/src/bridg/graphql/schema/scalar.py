from strawberry.types.scalar import ScalarDefinition, scalar
from strawberry.utils.str_converters import to_camel_case

from . import ConceptDescriptor, InstanceIdentifier, IntervalPointInTime, PhysicalQuantity


def _serialize_dataclass(cl):
    keys = cl.__dataclass_fields__.keys()

    def serialize(x):
        return {to_camel_case(k): getattr(x, k) for k in keys}

    return serialize


def _parse_dataclass(cl):
    keys = cl.__dataclass_fields__.keys()

    def parse(x):
        return cl(**{k: x.get(to_camel_case(k)) for k in keys})

    return parse


SCALAR_REGISTRY: dict[object, ScalarDefinition] = {
    ConceptDescriptor: scalar(
        name="ConceptDescriptor",
        serialize=_serialize_dataclass(ConceptDescriptor),
        parse_value=_parse_dataclass(ConceptDescriptor),
    ),
    InstanceIdentifier: scalar(
        name="InstanceIdentifier",
        serialize=_serialize_dataclass(InstanceIdentifier),
        parse_value=_parse_dataclass(InstanceIdentifier),
    ),
    IntervalPointInTime: scalar(
        name="IntervalPointInTime",
        serialize=IntervalPointInTime.serialize,
        parse_value=IntervalPointInTime.parse_value,
    ),
    PhysicalQuantity: scalar(
        name="PhysicalQuantity",
        serialize=_serialize_dataclass(PhysicalQuantity),
        parse_value=_parse_dataclass(PhysicalQuantity),
    ),
}
