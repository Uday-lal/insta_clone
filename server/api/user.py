from .resource.usersResource import UserResource
from flask import abort
from bson.objectid import ObjectId

class User(UserResource):
    def __init__(self, *args, **kwargs):
        super(User, self).__init__(*args, **kwargs)

    def get(self):
        token = self.readUserToken()
        if token is not None:
            query = {"_id": ObjectId(token)}
            userData = self.userModel.read(query)
            data = {
                "name": userData["name"],
                "email": userData["email"],
                "profile_img": userData["profile_img"],
                "profile_color": userData["color"],
                "about": userData["about"],
                "tag_name": userData["tag_name"]
            }
            return data
        else:
            return abort(401, "Unauthenticated")
    
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
