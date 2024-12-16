import os

from flask.cli import load_dotenv


def get_env(prefix: str = "FLASK"):
    return os.environ.get(f"{prefix}_ENV", "development")


def load_env(prefix: str = "FLASK"):
    env = get_env(prefix)
    path = f".env.{env}"
    load_dotenv()
    load_dotenv(path)
