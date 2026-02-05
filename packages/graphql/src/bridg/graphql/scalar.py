from strawberry.types.scalar import ScalarDefinition, scalar

from .datatype import ConceptDescriptor, InstanceIdentifier


def _serialize_concept_descriptor(x: ConceptDescriptor):
    return {
        "code": x.code,
        "code_system": x.code_system,
        "display_name": x.display_name,
    }


def _parse_concept_descriptor(x: dict):
    x["display_name"] = x.get("display_name", None)
    return ConceptDescriptor(**x)


# FIXME: do serialization consistently
SCALAR_REGISTRY: dict[object, ScalarDefinition] = {
    ConceptDescriptor: scalar(
        name="ConceptDescriptor",
        serialize=_serialize_concept_descriptor,
        parse_value=_parse_concept_descriptor,
    ),
    InstanceIdentifier: scalar(
        name="InstanceIdentifier",
        serialize=lambda x: x.__dict__,
        parse_value=lambda x: InstanceIdentifier(**x),
    ),
}
