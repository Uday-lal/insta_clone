from bson.objectid import ObjectId
from .modal import Modal


class PostModel(Modal):
    def __init__(self) -> None:
        super(Modal, self).__init__("posts")
    
    def read(self, query: dict):
        data = self.collection.find_one(query)
        return data

    def create(self, data: dict):
        self.collection.create_index('user_id', unique=True)
        self.collection.insert_one(data)

    def update(self, data: dict, id: ObjectId):
        try:
            self.collection.update_one({"_id": id}, {"$set": data}, upsert=True)
            return True
        except Exception as e:
            return False

    def delete(self, id: ObjectId):
        self.collection.delete_one({"_id": id})
