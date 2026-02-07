from strawberry.types.scalar import ScalarDefinition, scalar

from .datatype import ConceptDescriptor, InstanceIdentifier


def _serialize_dataclass(cl):
    def serialize(x):
        return {k: getattr(x, k) for k in cl.__dataclass_fields__.keys()}

    return serialize


def _parse_dataclass(cl):
    def parse(x):
        return cl(**{k: x.get(k) for k in cl.__dataclass_fields__.keys()})

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
}
