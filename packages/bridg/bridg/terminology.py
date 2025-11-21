from typing import Optional

from sqlalchemy.orm import Session

from .datatype import ConceptDescriptor


class TerminologyService:
    _session: Session
    _cache: dict[str, ConceptDescriptor]

    def __init__(self, session: Session) -> None:
        self._session = session
        self._cache = {}

    def _key(self, code: str, code_system: str) -> str:
        return f"{code_system}/{code}"

    def get(self, code: str, code_system: str) -> Optional[ConceptDescriptor]:
        key = self._key(code, code_system)
        if cd := self._cache.get(key):
            return cd
        if cd := self._session.query(ConceptDescriptor).filter_by(code=code, code_system=code_system).one_or_none():
            self._cache[key] = cd
            return cd

    def get_or_create(self, code: str, code_system: str, display_name: Optional[str] = None) -> ConceptDescriptor:
        if cd := self.get(code=code, code_system=code_system):
            return cd
        cd = ConceptDescriptor(code=code, code_system=code_system, display_name=display_name)
        key = self._key(code, code_system)
        self._cache[key] = cd
        # TODO: If I commit something with this code, it would be saved, right?
        self._session.add(cd)
        return cd
