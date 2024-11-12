#!/bin/sh
dropdb -h localhost -U postgres bridg
createdb -h localhost -U postgres bridg
python -m dev.migrate
python -m dev.seed
