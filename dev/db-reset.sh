dropdb -h localhost -U postgres umdb
createdb -h localhost -U postgres umdb
python dev/migrate.py
python dev/seed.py
