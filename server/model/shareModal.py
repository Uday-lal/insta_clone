from bson.objectid import ObjectId
from .modal import Modal


class ShareModal(Modal):
    def __init__(self):
        super(ShareModal, self).__init__(collectionName="shares", validator={
            '$jsonSchema': {
                'bsonType': 'object',
                'title': 'Share Object Validation',
                'required': ['user_id', 'post_id'],
                'properties': {
                    'user_id': {
                        'bsonType': 'objectId',
                        'description': "'user_id' must be an objectId and is required"
                    },
                    'post_id': {
                        'bsonType': 'obejctId',
                        'description': "'post_id' must be an objectId and is required"
                    }
                }
            }
        })
