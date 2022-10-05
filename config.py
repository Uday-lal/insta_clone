from dotenv import load_dotenv
from pathlib import Path
import os


class Config:
    def __init__(self) -> None:
        envPath = Path(".") / ".env"
        load_dotenv(dotenv_path=envPath)
        self.prod = os.getenv("prod")
        self.dbUserName = os.getenv("DB_USERNAME")
        self.dbPassword = os.getenv("DB_PASSWORD")
