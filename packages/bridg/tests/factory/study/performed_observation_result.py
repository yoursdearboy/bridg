import builtins
import datetime
from typing import Any, Type, get_args

from polyfactory import Ignore, Use

import bridg
from bridg import PerformedObservationResult

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory, PhysicalQuantityFactory


class NOT_SET:
    pass


class PerformedObservationResultFactory(BaseFactory[PerformedObservationResult]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    type = Ignore()

    type_code = ConceptDescriptorFactory

    value_null_flavor_reason = None

    baseline_indicator = False
    derived_indicator = False

    created_date = Use(BaseFactory.__faker__.date_time_this_month)
    reported_date = Use(BaseFactory.__faker__.date_time_this_month)

    comment = None

    producing_performed_observation = Ignore()

    value_cd = Ignore()
    value_pq_value = Ignore()
    value_pq_unit = Ignore()
    value_datetime = Ignore()
    value_date = Ignore()
    value_st = Ignore()

    @classmethod
    def build(cls, *_: Any, data_type: None | Type | NOT_SET = NOT_SET, **kwargs: Any) -> PerformedObservationResult:
        obj = super().build(**kwargs)
        if data_type == NOT_SET:
            if cls.__random__.random() > 0.1:
                data_type = cls.__random__.choice(get_args(bridg.DataValue))
            else:
                data_type = None
        match data_type:
            case None:
                obj.value = None
            case bridg.ConceptDescriptor:
                obj.value = ConceptDescriptorFactory.build()
            case bridg.PhysicalQuantity:
                obj.value = PhysicalQuantityFactory.build()
            case datetime.datetime:
                obj.value = cls.__faker__.date_time_this_century()
            case datetime.date:
                obj.value = cls.__faker__.date_this_century()
            case builtins.str:
                obj.value = cls.__faker__.sentence(3, variable_nb_words=True)
            case _:
                raise RuntimeError("Unknown data type")
        return obj
