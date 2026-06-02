#!/bin/sh
export BRIDG_ENV=test
dropdb -h localhost -U postgres bridg-test
createdb -h localhost -U postgres bridg-test
python -m dev.migrate
pytest ${@}
