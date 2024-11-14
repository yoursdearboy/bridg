from typing import List


def is_blank(x):
    return x == ""


def remove_blank_dicts(x: List[dict], test=is_blank) -> List[dict]:
    return [y for y in x if not all(test(v) for v in y.values())]
