from .resource.usersResource import UserResource
from bson.objectid import ObjectId

class User(UserResource):
    def __init__(self, *args, **kwargs):
        super(User, self).__init__(*args, **kwargs)

    def get(self):
        token = self.readUserToken()
        if token is not None:
            query = {"_id": ObjectId(token)}
            data = self.userModel.read(query)
    
    def delete(self):
        pass
