from . import code_system, defined_activity, person, space, subject

routers = [
    code_system.router,
    defined_activity.router,
    person.router,
    space.router,
    subject.router,
]
