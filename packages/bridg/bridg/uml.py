"""
FIXME: Split bridg into persistence and this
"""

import logging
import xml.etree.ElementTree as ET

import networkx as nx

MODEL_FILE = "tmp/BRIDG 5.3.1 Comprehensive Domain Information Model.xmi"


# def handle_class(event, elem):
#     if "xmi.id" not in elem.attrib or "name" not in elem.attrib:
#         logging.info("No id or name for %s", elem)
#         return
#     id_ = elem.attrib["xmi.id"]
#     name = elem.attrib["name"]
#     C[name] = id_
#     C[id_] = name
#     G.add_node(id_, **elem.attrib)
#     A.add_node(id_, **elem.attrib)


def handle_generalization(_, elem):
    u = elem.attrib["subtype"]
    v = elem.attrib["supertype"]
    return (v, u, elem.attrib)


def load_generalizations(f):
    for event, elem in ET.iterparse(f, ("end",)):
        if elem.tag.endswith("Generalization"):
            yield handle_generalization(event, elem)


def load_generalizations_graph(f):
    G = nx.DiGraph()
    for u, v, attr in load_generalizations(f):
        G.add_edge(u, v, **attr)
    return G


def handle_association(_, elem):
    source = elem.find(".//*[@tag='ea_end'][@value='source']/....")
    target = elem.find(".//*[@tag='ea_end'][@value='target']/....")
    u = source.attrib["type"]
    v = target.attrib["type"]
    attr = {**elem.attrib, "source": source.attrib, "target": target.attrib}
    return (u, v, attr)


def load_associations(f):
    for event, elem in ET.iterparse(f, ("end",)):
        if elem.tag.endswith("Association"):
            yield handle_association(event, elem)


def load_associations_graph(f, G=None):
    A = nx.MultiGraph()
    for u, v, attr in load_associations(f):
        if G is None:
            A.add_edge(u, v, **attr)
        else:
            for u in nx.dfs_tree(G, u):
                for v in nx.dfs_tree(G, v):
                    A.add_edge(u, v, **attr)
    return A


with open(MODEL_FILE, "rb") as f:
    f.seek(0)
    G = load_generalizations_graph(f)
    f.seek(0)
    A = load_associations_graph(f, G)
#     f.seek(0)


# SKIP_CLASSES = [
#     r"Adverse*",
#     r"Defined*",
#     r"Molecular*",
#     r"Performed(Exclusion|Inclusion)Criterion",
#     r"PerformedHistopathology*",
#     r"PerformedLesion*",
#     r"PerformedMaterial*",
#     r"PerformedSpecimen*",
#     r"Planned*",
#     r"Scheduled*",
#     "AnatomicPathologySectionVersion",
#     "Biologic",
#     "Biomarker",
#     "CausalAssessment",
#     "CellCulture",
#     "CellLine",
#     "Container",
#     "Cosmetic",
#     "Device",
#     "DocumentVersion",
#     "Drug",
#     "Epoch",
#     "EvaluatedActivityRelationship",
#     "EvaluatedResultRelationship",
#     "ExperimentalActivityItem",
#     "ExperimentalUnit",
#     "FoodProduct",
#     "InterventionalStudyProtocolVersion",
#     "MicrobiologicalCulture",
#     "PerformedDiagnosis",
#     "PerformedEligibilityCriterion",
#     "PerformedExperimentalUnitAllocation",
#     "PerformedGenetic*",
#     "PerformedImagingStudy",
#     "PerformedNotification",
#     "PerformedProductInvestigation",
#     "PerformedProductInvestigationResult",
#     "PerformedProductProblemDiscovery",
#     "PerformedProgressCount",
#     "PerformedProtocolDeviation",
#     "PerformedReportGeneration",
#     "PerformedStudySubjectMilestone",
#     "PerformedSubjectMilestone",
#     "Performer",
#     "Place",
#     "PointOfContact",
#     "Product",
#     "Radiopharmaceutical",
#     "ReportVersion",
#     "ResultClassification",
#     "SafetyReportVersion",
#     "Software",
#     "StandardOfCareDataCollection",
#     "StorageEquipment",
#     "StudyCountry",
#     "StudySite",
#     "TargetAnatomicSite",
# ]

# # This is action
# SKIP_CLASSES += [
#     "ObservationResultActionTakenRelationship",
# ]

# # This is action cause
# SKIP_EDGES = [
#     (None, "triggeringPerformedObservationResult"),
# ]


# def _skip_class(id_):
#     name = C[id_]
#     for p in SKIP_CLASSES:
#         if re.match(p, name):
#             return True


# def _skip_edge(edge):
#     u, v, k = edge
#     uname = C[u]
#     vname = C[v]
#     target = A[u][v][k]["target"]
#     source = A[u][v][k]["source"]
#     tname = target["name"]
#     sname = source["name"]
#     if (uname, tname) in SKIP_EDGES:
#         return True
#     if (None, tname) in SKIP_EDGES:
#         return True
#     if (sname, vname) in SKIP_EDGES:
#         return True
#     if (sname, None) in SKIP_EDGES:
#         return True
#     if (uname, tname, sname, vname) in SKIP_EDGES:
#         return True
#     return False


# def _filter_path(path):
#     if any(_skip_class(edge[1]) for edge in path):
#         return False
#     if any(_skip_edge(edge) for edge in path):
#         return False
#     return True
