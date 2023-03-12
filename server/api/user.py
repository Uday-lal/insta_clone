from .resource.usersResource import UserResource
from flask import abort, request
from bson.objectid import ObjectId
from ..model.followModal import FollowModal

class User(UserResource):
    def __init__(self, *args, **kwargs):
        super(User, self).__init__(*args, **kwargs)

    def get(self):
        tag_name = request.args.get('tag_name')
        token = self.token
        query = {"_id": ObjectId(token)} if tag_name is None else {"tag_name": tag_name}
        userData = self.userModel.read(query)
        if userData is not None:
            followModal = FollowModal()
            followData = followModal.read({
                'user_id': ObjectId(token), 
                'following_id': ObjectId(userData["_id"])
            })
            data = {
                "id": userData["_id"],
                "name": userData["name"],
                "email": userData["email"],
                "profile_img": userData["profile_img"],
                "profile_color": userData["color"],
                "about": userData["about"],
                "tag_name": userData["tag_name"],
                'is_you_following': followData is not None,
            }
            return data, 200
        return {'message': 'User not found'}, 404
    
    def put(self):
        self.parser.add_argument("username", type=str, help="username is required", required=True, location="form")
        self.parser.add_argument("about", type=str, location="form")
        args = self.parser.parse_args()
        username = args["username"]
        about = args["about"]
        updateData = {
            "name": username,
            "about": about
        }
        isUpdateDone = self.userModel.update(updateData, ObjectId(self.token))
        if isUpdateDone:
            return {'message': 'User updated successfully'}, 200
        return {"message": "Something went wrong :("}, 500


    def delete(self):
        pass
