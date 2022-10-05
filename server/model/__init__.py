from pymongo import MongoClient
from config import Config
import urllib.parse


config = Config()
dbUsername = config.dbUserName
dbPassword = config.dbPassword
connectionString = f"mongodb://{dbUsername}:{urllib.parse.quote(dbPassword)}@127.0.0.1"
client = MongoClient(connectionString)

DB = client['insta_clone']
