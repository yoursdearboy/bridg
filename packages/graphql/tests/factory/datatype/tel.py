from bridg.graphql.datatype import TelecommunicationAddressInput

from .url import URLInputFactoryy


class TelecommunicationAddressInputFactory[T: TelecommunicationAddressInput](URLInputFactoryy[T]):
    __is_base_factory__ = True

    use = None
