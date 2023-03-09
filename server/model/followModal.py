from .modal import Modal


class FollowModal(Modal):
    def __init__(self):
        super().__init__(collectionName="follow", validators={
            '$jsonSchema': {
                'bson': 'object',
                'title': 'Follow Object Validation',
                'required': ['user_id', 'following_id'],
                'properties': {
                    'user_id': {
                        'bsonType': 'string',
                        'description': "'user_id' must be a string and is required"
                    },
                    'following_id': {
                        'bsonType': 'string',
                        'description': "'following_id' must be a string and is required"
                    },
                }
            }
        })
