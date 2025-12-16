import os

from dotenv import load_dotenv


def get_env(prefix: str = "BRIDG"):
    return os.environ.get(f"{prefix}_ENV", "development")


def load_env(prefix: str = "BRIDG"):
    env = get_env(prefix)
    path = f".env.{env}"
    load_dotenv()
    load_dotenv(path)
