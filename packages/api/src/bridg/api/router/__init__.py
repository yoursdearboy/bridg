from . import code_system, defined_activity, person, space

routers = [
    code_system.router,
    defined_activity.router,
    person.router,
    space.router,
]
