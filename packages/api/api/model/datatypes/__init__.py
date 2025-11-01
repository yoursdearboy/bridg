from datetime import date, datetime
from typing import Annotated, Union

import bridg
from pydantic import Discriminator, Tag

from .cd import ConceptDescriptor
from .pq import PhysicalQuantity


def discriminator(x) -> str:
    if isinstance(x, bridg.ConceptDescriptor):
        return "CD"
    if isinstance(x, bridg.PhysicalQuantity):
        return "PQ"
    if isinstance(x, bool):
        return "BL"
    if isinstance(x, date):
        return "TS.DATE"
    if isinstance(x, datetime):
        return "TS.DATETIME"
    raise RuntimeError("Unknown datatype")


DataValue = Annotated[
    Union[
        Annotated[ConceptDescriptor, Tag("CD")],
        Annotated[PhysicalQuantity, Tag("PQ")],
        Annotated[bool, Tag("BL")],
        Annotated[date, Tag("TS.DATE")],
        Annotated[datetime, Tag("TS.DATETIME")],
    ],
    Discriminator(discriminator),
]
