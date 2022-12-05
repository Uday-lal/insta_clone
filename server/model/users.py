from . import DB
from bson.objectid import ObjectId


class UserModel:
    def __init__(self) -> None:
        self.users = DB["users"]
    
    def read(self, query):
        data = self.users.find_one(query)
        return data

    def create(self, data: dict):
        self.users.create_index("email", unique=True)
        self.users.insert_one(data) 

    def update(self, data: dict, id: ObjectId):
        try:
            self.users.update_one({"_id": id}, {"$set": data}, upsert=True)
            return True
        except Exception as e:
            return False

    def delete(self, id: ObjectId):
        self.users.delete_one({"_id": id})
