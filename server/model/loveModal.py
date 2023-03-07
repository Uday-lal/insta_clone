from bson.objectid import ObjectId
from .modal import Modal


class LoveModal(Modal):
    def __init__(self) -> None:
        super().__init__(collectionName="reaction", validator={
            '$jsonSchema': {
                'bsonType': 'object',
                'title': "Reaction Object Validation",
                'required': ['user_id', 'post_id'],
                'properties': {
                    'user_id': {
                        'bsonType': 'string',
                        'description': "'user_id' must be a string and is required"
                    },
                    'post_id': {
                        'bsonType': 'string',
                        'description': "'post_id' must be a string and is required"
                    },
                }
            }
        })
    
    def read(self, query: dict):
        data = self.collection.find_one(query)
        data["_id"] = str(data["_id"])
        return data
    
    def create(self, data: dict):
        self.collection.insert_one(data)

    def update(self, data: dict, id: ObjectId):
        try:
            self.collection.update_one({"_id": id}, {"$set": data}, upsert=True)
            return True
        except Exception as e:
            return False

    def delete(self, id: ObjectId):
        try:
            self.collection.delete_one({"_id": id})
            return True
        except Exception as e:
            return False

    def readAll(self, userId: str):
        """
        Return all the loves that a paticular user
        :userId str: The id of the user
        :return: list
        """
        data = self.collection.find({'user_id': userId})
        return data

    def readAllLoves(self, postId: str):
        """
        Return all the loves on a paticular post
        :postId: The id of the post
        :return: list
        """
        data = self.collection.find({'user_id': postId})
        return data
    
    def countLove(self, postId: str):
        loveCount = self.collection.find({'post_id': postId}).count()
        return loveCount
