from polyfactory import Use

from api.model import ConceptDescriptor

from ..base import BaseFactory


class ConceptDescriptorFactory(BaseFactory[ConceptDescriptor]):
    __set_as_default_factory_for_type__ = True

    code = Use(BaseFactory.__faker__.unique.word)
    code_system = Use(BaseFactory.__faker__.word)
    display_name = Use(lambda: BaseFactory.__faker__.sentence(3, variable_nb_words=True))
