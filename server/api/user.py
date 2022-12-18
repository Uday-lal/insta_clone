from .resource.usersResource import UserResource
from flask import abort
from bson.objectid import ObjectId
from PIL import Image
import werkzeug
import secrets
import os

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
                "about": userData["about"]
            }
            return data
        else:
            return abort(401, "Unauthenticated")
    
    def put(self):
        self.parser.add_argument("username", type=str, help="username is required", required=True, location="form")
        self.parser.add_argument("about", type=str, location="form")
        self.parser.add_argument(
            "profileImg", 
            type=werkzeug.datastructures.FileStorage,
            location="files"
        )
        args = self.parser.parse_args()
        username = args["username"]
        about = args["about"]
        profileImg = args["profileImg"]
        imageName = None
        if profileImg is not None:
            imageName = self._saveProfileImg(profileImg)

        if imageName is None:
            updateData = {
                "name": username,
                "about": about
            }
        else:
            updateData = {
                "name": username,
                "about": about,
                "profile_img": imageName 
            }
        isUpdateDone = self.userModel.update(updateData, ObjectId(self.token))
        if isUpdateDone:
            return {'message': 'User updated successfully'}, 200
        return {"message": "Something went wrong :("}, 500


    def delete(self):
        pass

    def _saveProfileImg(self, profileImg):
        _, fileExt = os.path.splitext(profileImg.filename)
        size = (250, 250)
        imageName = secrets.token_hex(8) + fileExt
        filePath = os.path.join(os.getcwd(), 'server', 'static', 'profile_imgs', imageName)
        image = Image.open(profileImg)
        image.thumbnail(size)
        image.save(filePath)
        return imageName
