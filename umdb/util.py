def setattrs(obj, x):
    for key, value in x.items():
        if isinstance(value, dict):
            raise NotImplemented()
        elif isinstance(value, list):
            raise NotImplemented()
        else:
            setattr(obj, key, value)
    return obj
