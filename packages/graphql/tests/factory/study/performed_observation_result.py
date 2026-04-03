import datetime
from datetime import timezone
from typing import Any, cast

from polyfactory import Use
from strawberry import Some

from bridg.alchemy import DataTypeName
from bridg.graphql.schema import DataValue, PerformedObservationResultInput

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory, IntervalPointInTimeFactory, PhysicalQuantityFactory
from ..maybe import make_some


class _NOT_SET:
    pass


def _gen_value(data_type: DataTypeName | None) -> DataValue | None:
    if data_type is None:
        return None
    if data_type == DataTypeName.CD:
        return ConceptDescriptorFactory.build()
    if data_type == DataTypeName.IVL_TS:
        return IntervalPointInTimeFactory.build()
    if data_type == DataTypeName.PQ:
        return PhysicalQuantityFactory.build()
    if data_type == DataTypeName.ST:
        return BaseFactory.__faker__.sentence(3, variable_nb_words=True)
    if data_type == DataTypeName.TS_DATE:
        return BaseFactory.__faker__.date_this_century(after_today=True)
    if data_type == DataTypeName.TS_DATETIME:
        return BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=datetime.timezone.utc)
    raise RuntimeError(f"Unknown data type {data_type}")


class PerformedObservationResultInputFactory(BaseFactory[PerformedObservationResultInput]):
    id = None

    type_code = Use(make_some(ConceptDescriptorFactory.build))
    value_null_flavor_reason = None

    baseline_indicator = Some(False)
    derived_indicator = Some(False)

    created_date = Use(
        make_some(lambda: BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc))
    )
    reported_date = Use(
        make_some(lambda: BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc))
    )

    comment = Use(make_some(BaseFactory.__faker__.text))

    value = None

    @classmethod
    def build(cls, *_: Any, data_type: DataTypeName | None | type[_NOT_SET] = _NOT_SET, **kwargs: Any):
        obj = super().build(**kwargs)

        if "value" not in kwargs:
            if data_type == _NOT_SET:
                if cls.__random__.random() > 0.1:
                    data_type = cls.__faker__.enum(DataTypeName)
                else:
                    data_type = None
            else:
                data_type = cast(DataTypeName | None, data_type)

            obj.value = Some(_gen_value(data_type))

        return obj
