from typing import get_args

from sqlalchemy.orm import Session

from bridg import DataValue
from bridg.factory import PerformedObservationResultFactory


def test_performed_observation_result_value_persistence(session: Session):
    data_types = get_args(DataValue) + (None,)
    for type_old in data_types:
        for type_new in data_types:
            old = PerformedObservationResultFactory.create_sync(data_type=type_old)
            new = PerformedObservationResultFactory.build(data_type=type_new)
            old.value = new.value
            session.commit()
            session.expire(old)
            assert old.value == new.value
