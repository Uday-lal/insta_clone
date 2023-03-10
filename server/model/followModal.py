from .modal import Modal
from bson.objectid import ObjectId


class FollowModal(Modal):
    def __init__(self):
        super().__init__(collectionName="follow", validator={
            '$jsonSchema': {
                'bsonType': 'object',
                'title': 'Follow Object Validation',
                'required': ['user_id', 'following_id'],
                'properties': {
                    'user_id': {
                        'bsonType': 'objectId',
                        'description': "'user_id' must be a string and is required"
                    },
                    'following_id': {
                        'bsonType': 'objectId',
                        'description': "'following_id' must be a string and is required"
                    },
                }
            }
        })


    def getFollowers(self, user_id: ObjectId):
        followers = self.collection.aggregate([
            {
                '$match': {'following_id': user_id}
            },
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'following_id',
                    'foreignField': "_id",
                    'as': 'followers'   
                }
            },
            {
                '$project': {
                    '_id': {
                        '$toString': '$_id'
                    },
                    'name': '$followers.name',
                    'email': '$followers.email',
                    'profile_img': '$followers.profile_img',
                    'color': '$followers.color',
                    'about': '$followers.about',
                    'tag_name': '$followers.tag_name',
                }
            },
            { "$unwind": "$name" },
            { "$unwind": "$email" },
            { "$unwind": "$profile_img" },
            { "$unwind": "$color" },
            { "$unwind": "$about" },
            { "$unwind": "$tag_name" }
        ])
        return list(followers)

    def getFollowings(self, user_id: ObjectId):
        followings = self.collection.aggregate([
            {
                '$match': {'user_id': user_id}
            },
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'following_id',
                    'foreignField': "_id",
                    'as': 'followers'   
                }
            },
            {
                '$project': {
                    '_id': {
                        '$toString': '$_id'
                    },
                    'name': '$followers.name',
                    'email': '$followers.email',
                    'profile_img': '$followers.profile_img',
                    'color': '$followers.color',
                    'about': '$followers.about',
                    'tag_name': '$followers.tag_name',
                }
            },
            { "$unwind": "$name" },
            { "$unwind": "$email" },
            { "$unwind": "$profile_img" },
            { "$unwind": "$color" },
            { "$unwind": "$about" },
            { "$unwind": "$tag_name" }
        ])
        return list(followings)

    def delete(self, qurey: dict) -> bool:
        try:
            self.collection.delete_one(qurey)
            return True
        except Exception:
            return False
