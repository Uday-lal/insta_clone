from .resource.followResource import FollowResource
from flask import request
from bson.objectid import ObjectId
from ..model.users import UserModel
from flask import abort

class Follow(FollowResource):
    def __init__(self, *args, **kwargs):
        super(Follow, self).__init__(*args, **kwargs)

    def get(self):
        userId = request.args.get('user_id')
        if userId is not None and self.varifyUserId(userId):
            followersCount = self.followModal.getDataCount({'following_id': ObjectId(userId)})
            followingCount = self.followModal.getDataCount({'user_id': ObjectId(userId)})
            followers = self.followModal.getFollowers(ObjectId(userId))
            followings = self.followModal.getFollowings(ObjectId(userId))
            data = {
                "followers_count": followersCount,
                "followings_count": followingCount,
                "followers": followers,
                "followings": followings
            }
            return data, 200
        return abort(404, "User not found")

    def post(self):
        self.parser.add_argument('following_id', type=str, required=True, help="following_id is required")
        args = self.parser.parse_args()
        following_id = args['following_id']
        self.followModal.create({'user_id': ObjectId(self.token), 'following_id': ObjectId(following_id)})
        return {'message': 'Following is successfully created'}, 200

    def delete(self):
        self.parser.add_argument('following_id', type=str, required=True, help="following_id is required")
        args = self.parser.parse_args()
        following_id = args['following_id']
        deleteData = {
            'user_id': ObjectId(self.token),
            'following_id': ObjectId(following_id)
        }
        isDeleted = self.followModal.delete(deleteData)
        if isDeleted:
            return {'message': 'Deleted successfully'}, 200
        return {'message': 'Delete failed'}, 500
    
    @staticmethod
    def varifyUserId(userId):
        user = UserModel()
        userData = user.read({"_id": ObjectId(userId)})
        return userData is not None
