from strawberry.types.scalar import ScalarDefinition, scalar
from strawberry.utils.str_converters import to_camel_case

from . import ConceptDescriptor, DataValue, InstanceIdentifier, IntervalPointInTime, PhysicalQuantity


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
        serialize=ConceptDescriptor.serialize,
        parse_value=ConceptDescriptor.parse_value,
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
        serialize=PhysicalQuantity.serialize,
        parse_value=PhysicalQuantity.parse_value,
    ),
    DataValue: scalar(
        name="DataValue",
        serialize=DataValue.serialize,
        parse_value=DataValue.parse_value,
    ),
}
