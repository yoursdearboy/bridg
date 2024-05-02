booleans = {"": None, "No": False, "Yes": True}


def enum2options(cls, allow_None=False):
    out = {s.name: s for s in cls}
    if allow_None:
        out[""] = None
    return out
