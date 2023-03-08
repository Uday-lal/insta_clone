from bson.objectid import ObjectId
from .modal import Modal



class CommentModal(Modal):
    def __init__(self) -> None:
        super().__init__(collectionName="comment", validator={
            '$jsonSchema': {
                'bsonType': 'object',
                'title': "Comment Object Validation",
                'required': ['user_id', 'post_id', 'comment', 'created_at'],
                'properties': {
                    'user_id': {
                        'bsonType': 'string',
                        'description': "'user_id' must be a string and is required"
                    },
                    'post_id': {
                        'bsonType': 'string',
                        'description': "'post_id' must be a string and is required"
                    },
                    'comment': {
                        'bsonType': 'string',
                        'description': "comment' must be a string and is required"
                    },
                    'created_at': {
                        'bsonType': 'double',
                        'description': "created_at' must be a double and is required"
                    },
                }
            }
        })