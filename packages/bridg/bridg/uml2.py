import networkx as nx
import matplotlib.pyplot as plt
import xml.etree.ElementTree as ET
import logging

MODEL_FILE = "tmp/BRIDG 5.3.1 Comprehensive Domain Information Model.xmi"

G = nx.Graph()

with open(MODEL_FILE, "rb") as f:
    for event, elem in ET.iterparse(f, ("end",)):
        if elem.tag.endswith("Class"):
            if "xmi.id" not in elem.attrib or "name" not in elem.attrib:
                logging.error("No id or name for %s", elem)
                continue
            id_ = elem.attrib["xmi.id"]
            G.add_node(id_, **elem.attrib)
        if elem.tag.endswith("Generalization"):
            subtype = elem.attrib["subtype"]
            supertype = elem.attrib["supertype"]
            G.add_edge(subtype, supertype, **elem.attrib)
        if elem.tag.endswith("Association"):
            source = elem.find(".//*[@tag='ea_end'][@value='source']/....")
            target = elem.find(".//*[@tag='ea_end'][@value='target']/....")
            G.add_edge(source.attrib["type"], target.attrib["type"])

def get_class(name):
    return next(filter(lambda x: x[1]["name"] == name, G.nodes(data=True)))[0]

PerformedObservation = get_class("PerformedObservation")
PerformedProcedure = get_class("PerformedProcedure")
PerformedObservationResult = get_class("PerformedObservationResult")
paths = nx.all_simple_edge_paths(G, PerformedProcedure, PerformedObservationResult, cutoff=3)
for path in paths:
    print(path)
#     print(" -> ".join([G.nodes(data=True)[n]["name"] for n in path]))

fig = plt.figure()
nx.draw(G)
fig.savefig("G.png")