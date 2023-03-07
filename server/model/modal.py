from . import DB
from bson.objectid import ObjectId


class Modal:
    def __init__(self, *args, **kwargs):
        collectionName = kwargs.get('collectionName')
        validator = kwargs.get('validator')
        self.collection = DB[collectionName]
        DB.command('collMod', collectionName, validator=validator)

    def read(self, query: dict) -> dict:
        data = self.collection.find_one(query)
        data["_id"] = str(data["_id"])
        return data
    
    def create(self, data: dict) -> None:
        self.collection.insert_one(data)

    def update(self, data: dict, id: ObjectId) -> bool:
        try:
            self.collection.update_one({"_id": id}, {"$set": data}, upsert=True)
            return True
        except Exception as e:
            return False

    def delete(self, id: ObjectId) -> bool:
        try:
            self.collection.delete_one({"_id": id})
            return True
        except Exception as e:
            return False

    def getDataCount(self, query: dict) -> int:
        count = self.collection.count_documents(query)
        return count

    def readAll(self, query: dict):
        data = self.collection.find(query)
        return data
