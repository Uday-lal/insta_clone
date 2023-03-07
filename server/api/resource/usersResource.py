from . import AppResource
from ...model.users import UserModel


class UserResource(AppResource):
    def __init__(self, *agrs, **kwargs):
        super(UserResource, self).__init__(*agrs, **kwargs)
        self.userModel = UserModel()
