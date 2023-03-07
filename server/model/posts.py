from bson.objectid import ObjectId
from .modal import Modal


class PostModel(Modal):
    def __init__(self) -> None:
        super().__init__(collectionName="posts", validator={
            '$jsonSchema': {
                'bsonType': 'object',
                'title': "Post Object Validation",
                'required': ['user_id', 'post', 'visibility', 'img_content', 'created_at'],
                'properties': {
                    'user_id': {
                        'bsonType': 'string',
                        'description': "'user_id' must be a string and is required"
                    },
                    'post': {
                        'bsonType': 'string',
                        'description': "'post' must be a string and is required"
                    },
                    'visibility': {
                        'bsonType': 'string',
                        'description': "'visibility' must be a string and is required"
                    },
                    'img_content': {
                        'bsonType': ['string', 'null'],
                        'description': "'img_content' must be a string and is required"
                    },
                    'created_at': {
                        'bsonType': 'double',
                        'description': "'img_content' must be a double and is required"
                    }
                }
            }
        })

    def readAll(self, userId: str):
        data = self.collection.find({'user_id': userId})
        return data
