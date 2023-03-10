from . import DB
from bson.objectid import ObjectId
from .modal import Modal


class UserModel(Modal):
    def __init__(self) -> None:
        super(UserModel, self).__init__(collectionName='users', validator={
            '$jsonSchema': {
                'bsonType': 'object',
                'title': "Users Object Validation",
                'required': ['name', 'email', 'password', 'color', 'about', 'tag_name'],
                'properties': {
                    'name': {
                        'bsonType': 'string',
                        'description': "'name' must be a string and is required"
                    },
                    'email': {
                        'bsonType': 'string',
                        'description': "'email' must be a string and is required"
                    },
                    'password': {
                        'bsonType': 'string',
                        'description': "'password' must be a string and is required"
                    },
                    'color': {
                        'bsonType': 'string',
                        'description': "'color' must be a string and is required"
                    },
                    'about': {
                        'bsonType': 'string',
                        'description': "'about' must be a string and is required"
                    },
                    'tag_name': {
                        'bsonType': 'string',
                        'description': "'tag_name' must be a string and is required"
                    },
                }
            }
        })
        self.collection.create_index("email", unique=True)
