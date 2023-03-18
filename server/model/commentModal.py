from bson.objectid import ObjectId
from .modal import Modal



class CommentModal(Modal):
    def __init__(self) -> None:
        super().__init__(collectionName="comment", validator={
            '$jsonSchema': {
                'bsonType': 'object',
                'title': "Comment Object Validation",
                'required': ['user_id', 'post_id', 'comment', 'created_at', 'is_edited'],
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
                    'is_edited': {
                        'bsonType': 'bool',
                        'description': "'is_edited' must be a boolean and is required"
                    }
                }
            }
        })
    
    def read(self, commentId: ObjectId):
        data = self.collection.aggregate([
            {'$match': {'_id': commentId}},
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'user_id',
                    'foreignField': '_id',
                    'as': 'data'
                }
            },
            {
                '$project': {
                    '_id': {
                        '$toString': '$_id'
                    },
                    'user_id': '$user_id',
                    'post_id': '$post_id',
                    'comment': '$comment',
                    'created_at': '$created_at',
                    'is_edited': '$is_edited',
                    'user_name': '$data.name',
                    'profile_img': '$data.profile_img'
                }
            }
        ])
        return data

    def readAll(self, postId: str):
        data = self.collection.aggregate([
            {'$match': {'post_id': postId}},
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'user_id',
                    'foreignField': "_id",
                    'as': 'data'   
                }
            },
            {
                '$project': {
                    '_id': {
                        '$toString': '$_id'
                    },
                    'user_id': '$user_id',
                    'post_id': '$post_id',
                    'comment': '$comment',
                    'created_at': '$created_at',
                    'is_edited': '$is_edited',
                    'user_name': '$data.name',
                    'profile_img': '$data.profile_img'
                }
            }
        ])
        return data
