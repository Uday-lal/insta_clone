from .resource.usersResource import UserResource
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
                "email": userData["email"]
            }
            return data
    
    def delete(self):
        pass
