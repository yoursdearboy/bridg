def setattrs(obj, x):
    for key, value in x.items():
        if isinstance(value, dict):
            raise NotImplementedError()
        elif isinstance(value, list):
            raise NotImplementedError()
        else:
            setattr(obj, key, value)
    return obj
