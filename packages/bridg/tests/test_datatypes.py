from bridg.datatypes import CharacterString, DataType, DataValue


def test_datatypes():
    a = DataValue()
    s = CharacterString("some str")
    print(DataValue.dataType, a.dataType)
    print(DataType.dataType)
    print(CharacterString.dataType, s.dataType, s.__dict__)
