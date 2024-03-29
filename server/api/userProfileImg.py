from .resource.usersResource import UserResource
from bson.objectid import ObjectId
from PIL import Image
import werkzeug
import secrets
import os


class UserProfileImg(UserResource):
    def __init__(self, *args, **kwargs):
        super(UserProfileImg, self).__init__(*args, **kwargs)

    def put(self):
        self.parser.add_argument(
            "profileImg", 
            type=werkzeug.datastructures.FileStorage,
            location="files",
            required=True
        )
        args = self.parser.parse_args()
        profileImg = args["profileImg"]
        imageName = self.__saveProfileImg(profileImg)
        updateData = {
            "profile_img": imageName 
        }
        isUpdateDone = self.userModel.update(updateData, ObjectId(self.token))
        if isUpdateDone:
            return {'message': 'User updated successfully'}, 200
        return {"message": "Something went wrong :("}, 500

    def __saveProfileImg(self, profileImg):
        self.__deleteUserOldProfileImg()
        _, fileExt = os.path.splitext(profileImg.filename)
        size = (250, 250)
        imageName = secrets.token_hex(8) + fileExt
        filePath = os.path.join(os.getcwd(), 'server', 'static', 'uploads', 'profile_imgs', imageName)
        image = Image.open(profileImg)
        image.thumbnail(size)
        image.save(filePath)
        return imageName

    def __deleteUserOldProfileImg(self):
        userData = self.userModel.read({'_id': ObjectId(self.token)})
        profileImg = userData['profile_img']
        if profileImg:
            filePath = os.path.join(os.getcwd(), 'server', 'static', 'uploads', 'profile_imgs', profileImg)
            if os.path.exists(filePath):
                os.remove(filePath)
