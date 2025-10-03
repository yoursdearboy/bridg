"""
FIXME: Split bridg into persistence and this
"""

import logging
import xml.etree.ElementTree as ET
from dataclasses import dataclass

import networkx as nx


@dataclass
class Class:
    id_: str
    name: str
    attr: dict


def handle_class(_, elem):
    if "xmi.id" not in elem.attrib or "name" not in elem.attrib:
        logging.info("No id or name for %s", elem)
        return
    id_ = elem.attrib["xmi.id"]
    name = elem.attrib["name"]
    return Class(id_, name, elem.attrib)


@dataclass
class Generalization:
    subtype: str
    supertype: str
    attr: dict


def handle_generalization(_, elem):
    return Generalization(
        elem.attrib["subtype"],
        elem.attrib["supertype"],
        elem.attrib,
    )


@dataclass
class Association:
    source: str
    target: str
    attr: dict


def handle_association(_, elem):
    source = elem.find(".//*[@tag='ea_end'][@value='source']/....")
    target = elem.find(".//*[@tag='ea_end'][@value='target']/....")
    return Association(
        source.attrib["type"],
        target.attrib["type"],
        {**elem.attrib, "source": source.attrib, "target": target.attrib},
    )


def handle_file(f):
    for event, elem in ET.iterparse(f, ("end",)):
        if elem.tag.endswith("Class"):
            yield handle_class(event, elem)
        if elem.tag.endswith("Generalization"):
            yield handle_generalization(event, elem)
        if elem.tag.endswith("Association"):
            yield handle_association(event, elem)


def load_class_labels(f):
    labels = {}
    for obj in handle_file(f):
        match obj:
            case Class(id_, name, _):
                labels[id_] = name
                labels[name] = id_
    return labels


def load_generalizations_graph(f):
    G = nx.DiGraph()
    for obj in handle_file(f):
        match obj:
            case Class(id_, _, _):
                G.add_node(id_)
            case Generalization(subtype, supertype, attr):
                G.add_edge(supertype, subtype, **attr)
    return G


def load_associations_graph(f, G=None):
    A = nx.MultiGraph()
    for obj in handle_file(f):
        match obj:
            case Class(id_, _, _):
                A.add_node(id_)
            case Association(s, t, attr):
                if G is None:
                    A.add_edge(s, t, **attr)
                else:
                    for s in nx.dfs_tree(G, s):
                        for t in nx.dfs_tree(G, t):
                            A.add_edge(s, t, **attr)
                A.add_edge(s, t, **attr)
    return A
