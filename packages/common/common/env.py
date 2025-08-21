import os

from dotenv import load_dotenv


def get_env(prefix: str = "BRIGD"):
    return os.environ.get(f"{prefix}_ENV", "development")


def load_env(prefix: str = "BRIGD"):
    env = get_env(prefix)
    path = f".env.{env}"
    load_dotenv()
    load_dotenv(path)
