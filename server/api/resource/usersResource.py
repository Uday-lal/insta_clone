from flask_restful import Resource
from flask_restful import reqparse
from flask import request
from flask import abort
from ...model.users import UserModel


class UserResource(Resource):
    def __init__(self, *agrs, **kwargs):
        super(UserResource, self).__init__(*agrs, **kwargs)
        self.parser = reqparse.RequestParser()
        self.userModel = UserModel()
        token = self.readUserToken()
        if token is None:
            return abort(401, "Unauthenticated")
        self.token = token

    @staticmethod
    def readUserToken():
        token = request.cookies.get("token")
        return token
