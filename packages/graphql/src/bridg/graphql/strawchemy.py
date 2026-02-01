from typing import Any, Generator

from sqlalchemy import Column, SQLColumnExpression, create_engine, inspect
from sqlalchemy.orm import (
    Composite,
    CompositeProperty,
    DeclarativeBase,
    MapperProperty,
    QueryableAttribute,
    RelationshipProperty,
    sessionmaker,
)
from strawchemy import Strawchemy, StrawchemyConfig
from strawchemy.dto import DTOConfig, DTOFieldDefinition
from strawchemy.dto.types import DTOMissing
from strawchemy.sqlalchemy.inspector import SQLAlchemyInspector

from bridg.common.env import load_env
from bridg.common.settings import load_settings

load_env()
settings = load_settings()
engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
session = sessionmaker(engine)


def _column_or_relationship(
    attribute: MapperProperty[Any],
) -> Column[Any] | RelationshipProperty[Any] | CompositeProperty[Any] | SQLColumnExpression[Any]:
    try:
        return attribute.parent.mapper.columns[attribute.key]
    except KeyError:
        try:
            return attribute.parent.mapper.composites[attribute.key]
        except KeyError:
            return attribute.parent.mapper.relationships[attribute.key]


def field_definitions(
    self, model: type[DeclarativeBase], dto_config: DTOConfig
) -> Generator[tuple[str, DTOFieldDefinition[DeclarativeBase, QueryableAttribute[Any]]]]:
    mapper = inspect(model)
    type_hints = self.get_type_hints(model)
    for prop in mapper.attrs:
        mapper_attr = mapper.attrs[prop.key]
        type_hint = type_hints.get(prop.key, DTOMissing)
        yield prop.key, self.field_definition(mapper_attr.class_attribute, dto_config, type_hint=type_hint)
    for prop in mapper.composites:
        mapper_attr = mapper.composites[prop.key]
        type_hint = type_hints.get(prop.key, DTOMissing)
        yield prop.key, self.field_definition(mapper_attr.class_attribute, dto_config, type_hint=type_hint)


def model_field_type(self, field_definition: DTOFieldDefinition[DeclarativeBase, QueryableAttribute[Any]]) -> Any:
    if field_definition.model_field._is_internal_proxy:
        if isinstance(field_definition.model_field.property, Composite):
            return field_definition.model_field.property.composite_class
    return field_definition.model_field.type.python_type


SQLAlchemyInspector._column_or_relationship = _column_or_relationship  # type: ignore
SQLAlchemyInspector.field_definitions = field_definitions
SQLAlchemyInspector.model_field_type = model_field_type

strawchemy = Strawchemy(
    StrawchemyConfig(
        "postgresql",
        session_getter=lambda _: session(),
    )
)
