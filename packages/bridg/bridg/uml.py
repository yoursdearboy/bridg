"""
FIXME: Split bridg into persistence and this
"""

import logging
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from functools import reduce
from io import BufferedReader
from itertools import groupby
from typing import Dict, List

ID = str
Name = str


@dataclass
class Attribute:
    name: Name


@dataclass
class Class:
    id_: ID
    name: Name
    is_abstract: bool
    attributes: Dict[Name, Attribute]

    def __hash__(self):
        return hash(self.id_)


@dataclass
class Generalization:
    name: str
    subtype: Class
    supertype: Class


@dataclass
class AssociationEnd:
    name: Name
    type: Class


@dataclass
class Association:
    name: str
    source: AssociationEnd
    target: AssociationEnd


@dataclass
class DB:
    "Index"

    classes: Dict[ID | Name, Class]
    generalizations: List[Generalization]
    supertypes: Dict[Class, Class]
    targets: Dict[Class, List[Association]]


class Parser:
    """Parse and index UML file."""

    def __init__(self, source: BufferedReader):
        self.source = source
        self.namespaces = {}
        self.classes: Dict[ID | Name, Class] = {}
        self.generalizations: List[Generalization] = []
        self.supertypes: Dict[Class, Class] = {}
        self.associations: List[Association] = []

    def _parse_namespaces(self):
        for event, elem in ET.iterparse(self.source, events=("start-ns",)):
            prefix, uri = elem
            self.namespaces[prefix] = uri
        self.source.seek(0)

    def _parse_attribute(self, node: ET.Element):
        return Attribute(name=node.attrib["name"])

    def _parse_attributes(self, node: ET.Element):
        nodes = node.findall(".//UML:Attribute", self.namespaces)
        attributes = [self._parse_attribute(n) for n in nodes]
        map = {a.name: a for a in attributes}
        return map

    def _parse_class(self, node: ET.Element):
        return Class(
            id_=node.attrib["xmi.id"],
            name=node.attrib["name"],
            is_abstract=node.attrib.get("is_abstract", "false") == "true",
            attributes=self._parse_attributes(node),
        )

    def _parse_generalization(self, node: ET.Element):
        return Generalization(
            name=node.attrib["name"],
            subtype=self.classes[node.attrib["subtype"]],
            supertype=self.classes[node.attrib["supertype"]],
        )

    def _filter_classes(self, nodes: List[ET.Element]):
        for node in nodes:
            if node.attrib.get("xmi.id") is None:
                logging.info("No id for %s", node)
                continue
            if node.attrib.get("name") is None:
                logging.info("No name for %s", node)
                continue
            yield node

    def _parse_classes(self, node: ET.Element):
        nodes = self._filter_classes(node.findall(".//UML:Class", self.namespaces))
        classes = [self._parse_class(n) for n in nodes]
        map = {
            **{c.id_: c for c in classes},
            **{c.name: c for c in classes},
        }
        return map

    def _parse_generalizations(self, node: ET.Element):
        nodes = node.findall(".//UML:Generalization", self.namespaces)
        generalizations = [self._parse_generalization(n) for n in nodes]
        return generalizations

    def _parse_supertypes(self):
        map = {}
        for g in self.generalizations:
            if g.subtype in map:
                raise RuntimeError("Supertype already defined")
            map[g.subtype] = g.supertype
        return map

    def _parse_association(self, node: ET.Element):
        source = node.find(".//UML:TaggedValue[@tag='ea_end'][@value='source']/....", self.namespaces)
        target = node.find(".//UML:TaggedValue[@tag='ea_end'][@value='target']/....", self.namespaces)
        assert source
        assert target
        return Association(
            name=node.attrib["name"],
            source=AssociationEnd(
                name=source.attrib["name"],
                type=self.classes[source.attrib["type"]],
            ),
            target=AssociationEnd(
                name=target.attrib["name"],
                type=self.classes[target.attrib["type"]],
            ),
        )

    def _parse_associations(self, node: ET.Element):
        nodes = node.findall(".//UML:Association", self.namespaces)
        associations = [self._parse_association(n) for n in nodes]
        return associations

    def _parse_targets(self):
        return {k: list(v) for k, v in groupby(self.associations, lambda a: a.source.type)}

    def _parse_db(self, node: ET.Element):
        self.classes = self._parse_classes(node)
        self.generalizations = self._parse_generalizations(node)
        self.associations = self._parse_associations(node)
        self.supertypes = self._parse_supertypes()
        self.targets = self._parse_targets()

    def parse(self):
        self._parse_namespaces()
        tree = ET.parse(self.source)
        root = tree.getroot()
        self._parse_db(root)
        return DB(
            classes=self.classes,
            generalizations=self.generalizations,
            supertypes=self.supertypes,
            targets=self.targets,
        )


def find_supertypes(db, class_: Class):
    if parent := db.supertypes.get(class_):
        yield parent
        find_supertypes(db, parent)


def find_attributes_recursively(db, class_):
    types = [class_] + list(find_supertypes(db, class_))
    return reduce(lambda a, b: {**a, **b.attributes}, types, {})


def find_targets(db, class_):
    return db.targets[class_]


def find_targets_recursively(db, class_):
    types = [class_] + list(find_supertypes(db, class_))
    return reduce(lambda a, b: [*a, *find_targets(db, b)], types, [])
