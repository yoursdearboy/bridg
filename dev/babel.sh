pybabel extract -F babel.cfg -o web/messages.pot .
pybabel update -i web/messages.pot -d web/translations
pybabel compile -d web/translations
