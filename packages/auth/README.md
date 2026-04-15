# Auth

The module has cli (command line interface).

```sh
# create user with password
python -m bridg.auth create demo -p pass

# and / or ldap username
python -m bridg.auth create demo --ldap-username demo@domain.org

# optionally generate token
python -m bridg.auth auth demo

# or add some
python -m bridg.auth auth demo -t token
```
