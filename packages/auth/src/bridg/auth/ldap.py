import logging

from ldap3 import SIMPLE, Connection, Server
from ldap3.core.exceptions import LDAPException

logging.basicConfig()


def check_ldap(server_uri: str, user: str, password: str):
    try:
        server = Server(server_uri)
        conn = Connection(server, user=user, password=password, authentication=SIMPLE)
        if conn.bind():
            conn.unbind()
            return True
    except LDAPException as e:
        logging.error(f"LDAP error: {e}")

    return False
