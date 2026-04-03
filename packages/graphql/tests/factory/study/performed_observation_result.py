import datetime
from datetime import timezone
from typing import Any

from polyfactory import Use
from strawberry import Some

from bridg.alchemy import DataTypeName
from bridg.graphql.schema import PerformedObservationResultInput

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory, IntervalPointInTimeFactory, PhysicalQuantityFactory
from ..maybe import make_some


class _NOT_SET:
    pass


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
    def build(cls, *_: Any, data_type: None | DataTypeName | type[_NOT_SET] = _NOT_SET, **kwargs: Any):
        obj = super().build(**kwargs)

        if data_type == _NOT_SET:
            if cls.__random__.random() > 0.1:
                if data_type == _NOT_SET:
                    data_type = cls.__faker__.enum(DataTypeName)
            else:
                data_type = None

        if data_type is None:
            obj.value = Some(None)
        elif data_type == DataTypeName.CD:
            obj.value = Some(ConceptDescriptorFactory.build())
        elif data_type == DataTypeName.IVL_TS:
            obj.value = Some(IntervalPointInTimeFactory.build())
        elif data_type == DataTypeName.PQ:
            obj.value = Some(PhysicalQuantityFactory.build())
        elif data_type == DataTypeName.ST:
            obj.value = Some(cls.__faker__.sentence(3, variable_nb_words=True))
        elif data_type == DataTypeName.TS_DATE:
            obj.value = Some(cls.__faker__.date_this_century(after_today=True))
        elif data_type == DataTypeName.TS_DATETIME:
            obj.value = Some(cls.__faker__.date_time_this_century(after_now=True, tzinfo=datetime.timezone.utc))
        else:
            raise RuntimeError(f"Unknown data type {data_type}")

        return obj
