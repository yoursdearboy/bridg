#!/bin/sh

# FIXME: Replace with Python script to handle DATABASE_URI

# Reset PostgreSQL
if pg_isready -h localhost >/dev/null; then
  dropdb -h localhost -U postgres bridg
  createdb -h localhost -U postgres bridg
else
  echo "NOTE: PostgreSQL is not running"
fi

# Reset SQLite
rm -f tmp/bridg.db

python -m dev.migrate
