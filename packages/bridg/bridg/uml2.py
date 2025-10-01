import logging
import xml.etree.ElementTree as ET

import matplotlib.pyplot as plt
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

out = []
paths = nx.all_simple_edge_paths(A, PerformedProcedure, PerformedObservationResult, cutoff=3)
for path in paths:
    ou = []
    path_skip = False
    for edge in path:
        u, v, key = edge  # type: ignore
        attrib = A[u][v][key]
        uattrib = G.nodes[u]
        vattrib = G.nodes[v]
        o = f"{uattrib['name']} -- {vattrib['name']} [headlabel={attrib['target']['name']}, taillabel={attrib['source']['name']}]"
        if (
            path_skip
            # or "AdverseEvent" in o
            # or "SafetyReportVersion" in o
            # or "PerformedReportGeneration" in o
            # or "PerformedProductInvestigationResult" in o
        ):
            path_skip = True
            continue
        if o not in out:
            ou.append(o)
    if not path_skip:
        out += ou

print("\n".join(out))

# fig = plt.figure()
# nx.draw(G)
# fig.savefig("G.png")
