from sqlalchemy.orm import class_mapper
from sqlalchemy_schemadisplay import create_schema_graph, create_uml_graph

from api.db import engine
from umdb import common, organization, person
from umdb.db import Base

models = [common, person, organization]

mappers = []

for model in models:
    for attr in dir(model):
        if attr[0] == "_":
            continue
        try:
            cls = getattr(model, attr)
            mappers.append(class_mapper(cls))
        except:
            pass

graph = create_schema_graph(
    engine=engine,
    metadata=Base.metadata,
    show_datatypes=False,
    show_indexes=False,
    rankdir="LR",
)
graph.write_dot("db.dot")
graph.write_png("db.png")

graph = create_uml_graph(mappers)
graph.write_dot("model.dot")
graph.write_png("model.png")
