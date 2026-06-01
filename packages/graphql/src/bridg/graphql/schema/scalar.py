from strawberry.types.scalar import ScalarDefinition, scalar

from . import (
    ConceptDescriptor,
    DataValue,
    IntervalPointInTime,
    PhysicalQuantity,
    parse_data_value,
    serialize_data_value,
)

SCALAR_REGISTRY: dict[object, ScalarDefinition] = {
    ConceptDescriptor: scalar(
        name="ConceptDescriptor",
        serialize=ConceptDescriptor.serialize,
        parse_value=ConceptDescriptor.parse_value,
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
        serialize=serialize_data_value,
        parse_value=parse_data_value,
    ),
}
