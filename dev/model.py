from sqlalchemy.orm import class_mapper
from sqlalchemy_schemadisplay import create_schema_graph, create_uml_graph

from api.db import engine
from umdb import common, organization, person, study
from umdb.db import Base

models = [common, organization, person, study]

mappers = []

for model in models:
    for attr in dir(model):
        if attr[0] == "_":
            continue
        try:
            cls = getattr(model, attr)
            mappers.append(class_mapper(cls))
        except Exception as e:
            print(e)

graph = create_schema_graph(
    engine=engine,
    metadata=Base.metadata,
    show_datatypes=False,
    show_indexes=False,
    rankdir="LR",
)
graph.write_dot("docs/db.dot")
graph.write_png("docs/db.png")

graph = create_uml_graph(mappers)
graph.write_dot("docs/model.dot")
graph.write_png("docs/model.png")
