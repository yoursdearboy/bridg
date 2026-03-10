from bridg.graphql.model import TelecommunicationAddressInput

from .url import URLInputFactoryy


class TelecommunicationAddressInputFactory(URLInputFactoryy[TelecommunicationAddressInput]):
    use = None
