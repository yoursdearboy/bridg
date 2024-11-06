dropdb -h localhost -U postgres bridg
createdb -h localhost -U postgres bridg
python dev/migrate.py
python dev/seed.py
