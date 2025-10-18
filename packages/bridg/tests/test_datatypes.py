from bridg.datatypes import CharacterString, DataType, DataValue, PhysicalQuantity


def test_datatypes():
    a = DataValue()
    s = CharacterString("some str")
    pq = PhysicalQuantity(42.0, "mm")
    # print(DataValue.dataType, a.dataType)
    # print(DataType.dataType)
    # print(CharacterString.dataType, s.dataType, s.__dict__)
    print(pq, pq.dict())
