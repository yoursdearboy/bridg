import yaml

from bridg.convert import convert

from .db import SessionLocal

with SessionLocal() as session:
    with open("dev/seed.yml") as f:
        data = yaml.load(f, yaml.FullLoader)
    objects = convert(data)
    session.add_all(objects)
    session.commit()
