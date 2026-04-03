from typing import Any

from polyfactory import Ignore

import bridg.alchemy

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory, PhysicalQuantityFactory


class _NOT_SET:
    pass


class DefinedObservationResultFactory(BaseFactory[bridg.alchemy.DefinedObservationResult]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    type = Ignore()

    value_negation_indicator = False

    type_code_id = Ignore()
    type_code = ConceptDescriptorFactory

    producing_defined_observation = Ignore()

    target_type = Ignore()
    target_coding_system = Ignore()
    target_unit = Ignore()
    derivation_expression = Ignore()

    value_cd_id = Ignore()
    value_cd = Ignore()
    value_ivl_ts_low = Ignore()
    value_ivl_ts_high = Ignore()
    value_pq_value = Ignore()
    value_pq_unit = Ignore()
    value_datetime = Ignore()
    value_date = Ignore()
    value_st = Ignore()

    @classmethod
    def build(
        cls, *_: Any, target_type: bridg.alchemy.DataTypeName | type[_NOT_SET] = _NOT_SET, **kwargs: Any
    ) -> bridg.alchemy.DefinedObservationResult:
        obj = super().build(**kwargs)

        if target_type == _NOT_SET:
            target_type = cls.__faker__.enum(bridg.alchemy.DataTypeName)

        obj.target_type = target_type  # type: ignore

        if target_type == bridg.alchemy.DataTypeName.CD:
            obj.target_coding_system = ConceptDescriptorFactory.build().code_system
        elif target_type == bridg.alchemy.DataTypeName.PQ:
            obj.target_unit = PhysicalQuantityFactory.build().unit

        return obj
