from typing import List

from umdb import Name, Person


def lookup(db, person: Person, limit=5) -> List[Person]:
    q = db.session.query(Person)
    if name := person.name[0]:
        q = q.filter(Person.name.any(Name.family.ilike(f"%{name.family}%")))
    return q.limit(limit).all()
