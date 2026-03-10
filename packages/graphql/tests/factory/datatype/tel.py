from bridg.graphql.schema import TelecommunicationAddressInput

from .url import URLInputFactoryy


class TelecommunicationAddressInputFactory(URLInputFactoryy[TelecommunicationAddressInput]):
    use = None
