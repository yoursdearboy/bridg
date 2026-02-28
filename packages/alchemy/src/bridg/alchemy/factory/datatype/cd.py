from polyfactory import Ignore, Use

from bridg.alchemy import ConceptDescriptor

from ..base import BaseFactory


def _from_str(x: str) -> ConceptDescriptor:
    try:
        code_system, code = x.split("/", 1)
        return ConceptDescriptor(code_system=code_system, code=code, display_name=None)
    except ValueError:
        raise Exception("String representation of ConceptDescriptor must be code_system/code")


class ConceptDescriptorFactory(BaseFactory[ConceptDescriptor]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()

    code = Use(BaseFactory.__faker__.unique.word)
    code_system = Use(BaseFactory.__faker__.word)
    display_name = Use(lambda: BaseFactory.__faker__.sentence(3, variable_nb_words=True))

    @classmethod
    def build(cls, *args, **kwargs) -> ConceptDescriptor:
        if len(args) > 0 and isinstance(args[0], str):
            return _from_str(args[0])
        return super().build(*args, **kwargs)
