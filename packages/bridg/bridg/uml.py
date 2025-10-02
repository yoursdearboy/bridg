"""
FIXME: Split bridg into persistence and this
"""

import logging
import re
import xml.etree.ElementTree as ET
from pathlib import Path

import networkx as nx

MODEL_FILE = "tmp/BRIDG 5.3.1 Comprehensive Domain Information Model.xmi"

C = {}
G = nx.DiGraph()
A = nx.MultiGraph()


def handle_class(event, elem):
    if "xmi.id" not in elem.attrib or "name" not in elem.attrib:
        logging.info("No id or name for %s", elem)
        return
    id_ = elem.attrib["xmi.id"]
    name = elem.attrib["name"]
    C[name] = id_
    C[id_] = name
    G.add_node(id_, **elem.attrib)
    A.add_node(id_, **elem.attrib)


def handle_generalization(event, elem):
    subtype = elem.attrib["subtype"]
    supertype = elem.attrib["supertype"]
    G.add_edge(supertype, subtype, **elem.attrib)


def handle_association(event, elem):
    source = elem.find(".//*[@tag='ea_end'][@value='source']/....")
    target = elem.find(".//*[@tag='ea_end'][@value='target']/....")
    s = source.attrib["type"]
    t = target.attrib["type"]
    for s in nx.dfs_tree(G, s):
        for t in nx.dfs_tree(G, t):
            A.add_edge(s, t, source=source.attrib, target=target.attrib)


with open(MODEL_FILE, "rb") as f:
    f.seek(0)

    for event, elem in ET.iterparse(f, ("end",)):
        if elem.tag.endswith("Class"):
            handle_class(event, elem)
        elif elem.tag.endswith("Generalization"):
            handle_generalization(event, elem)

    f.seek(0)

    for event, elem in ET.iterparse(f, ("end",)):
        if elem.tag.endswith("Association"):
            handle_association(event, elem)

PerformedObservation = C["PerformedObservation"]
PerformedProcedure = C["PerformedProcedure"]
PerformedObservationResult = C["PerformedObservationResult"]
Activity = C["Activity"]

SKIP_CLASSES = [
    r"Adverse*",
    r"Defined*",
    r"Molecular*",
    r"Performed(Exclusion|Inclusion)Criterion",
    r"PerformedHistopathology*",
    r"PerformedLesion*",
    r"PerformedMaterial*",
    r"PerformedSpecimen*",
    r"Planned*",
    r"Scheduled*",
    "AnatomicPathologySectionVersion",
    "Biologic",
    "Biomarker",
    "CausalAssessment",
    "CellCulture",
    "CellLine",
    "Container",
    "Cosmetic",
    "Device",
    "DocumentVersion",
    "Drug",
    "Epoch",
    "EvaluatedActivityRelationship",
    "EvaluatedResultRelationship",
    "ExperimentalActivityItem",
    "ExperimentalUnit",
    "FoodProduct",
    "InterventionalStudyProtocolVersion",
    "MicrobiologicalCulture",
    "PerformedDiagnosis",
    "PerformedEligibilityCriterion",
    "PerformedExperimentalUnitAllocation",
    "PerformedGenetic*",
    "PerformedImagingStudy",
    "PerformedNotification",
    "PerformedProductInvestigation",
    "PerformedProductInvestigationResult",
    "PerformedProductProblemDiscovery",
    "PerformedProgressCount",
    "PerformedProtocolDeviation",
    "PerformedReportGeneration",
    "PerformedStudySubjectMilestone",
    "PerformedSubjectMilestone",
    "Performer",
    "Place",
    "PointOfContact",
    "Product",
    "Radiopharmaceutical",
    "ReportVersion",
    "ResultClassification",
    "SafetyReportVersion",
    "Software",
    "StandardOfCareDataCollection",
    "StorageEquipment",
    "StudyCountry",
    "StudySite",
    "TargetAnatomicSite",
]

# This is action
SKIP_CLASSES += [
    "ObservationResultActionTakenRelationship",
]

# This is action cause
SKIP_EDGES = [
    (None, "triggeringPerformedObservationResult"),
]


def _skip_class(id_):
    name = C[id_]
    for p in SKIP_CLASSES:
        if re.match(p, name):
            return True


def _skip_edge(edge):
    u, v, k = edge
    uname = C[u]
    vname = C[v]
    target = A[u][v][k]["target"]
    source = A[u][v][k]["source"]
    tname = target["name"]
    sname = source["name"]
    if (uname, tname) in SKIP_EDGES:
        return True
    if (None, tname) in SKIP_EDGES:
        return True
    if (sname, vname) in SKIP_EDGES:
        return True
    if (sname, None) in SKIP_EDGES:
        return True
    if (uname, tname, sname, vname) in SKIP_EDGES:
        return True
    return False


def _filter_path(path):
    if any(_skip_class(edge[1]) for edge in path):
        return False
    if any(_skip_edge(edge) for edge in path):
        return False
    return True


out = nx.MultiGraph()
paths = nx.all_simple_edge_paths(A, PerformedProcedure, PerformedObservationResult, cutoff=3)
paths = filter(_filter_path, paths)
for path in paths:
    for u, v, k in path:  # type: ignore
        attrib = A[u][v][k]
        out.add_edge(
            u,
            v,
            k,
            headlabel=attrib["target"]["name"],
            taillabel=attrib["source"]["name"],
        )

print(out)
for n in out.nodes:
    print(C[n])

out.graph["node"] = {"style": "filled"}
out.graph["edge"] = {"fontsize": 9}
out.nodes[PerformedObservation]["fillcolor"] = "lightblue"
out.nodes[PerformedProcedure]["fillcolor"] = "coral"
out.nodes[PerformedObservationResult]["fillcolor"] = "lightgreen"
out.nodes[PerformedProcedure]["pos"] = "-1,-1!"
out.nodes[PerformedObservation]["pos"] = "2,0!"
out.nodes[PerformedObservationResult]["pos"] = "2,2!"

for u, v, k in out.edges(PerformedProcedure, keys=True):
    out[u][v][k]["color"] = "coral"

for u, v, k in out.edges(PerformedObservation, keys=True):
    out[u][v][k]["color"] = "lightblue"

for u, v, k in out.edges(PerformedObservationResult, keys=True):
    out[u][v][k]["color"] = "lightgreen"

out = nx.relabel_nodes(out, C)

o = nx.nx_pydot.to_pydot(out)
o.set_graph_defaults(layout="neato", splines="curved", dpi=300)
o.set_overlap("scale")
o.set_sep("+2.0")
o.write_png("G.png")

for i, path in enumerate(nx.all_simple_edge_paths(out, "PerformedProcedure", "PerformedObservationResult", cutoff=3)):
    filepath = []
    o = nx.Graph()
    for u, v, k in path:  # type: ignore
        attr = out[u][v][k]
        filepath += [attr["headlabel"], attr["taillabel"], v]
        o.add_edge(u, v, key=k, **attr)
    o = nx.nx_pydot.to_pydot(o)
    filename = filepath.pop()
    filepath = "/".join(["G"] + filepath)
    Path(filepath).mkdir(parents=True, exist_ok=True)
    o.write_png(f"{filepath}/{filename}.png")
