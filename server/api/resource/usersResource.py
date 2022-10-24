from flask_restful import Resource
from flask_restful import reqparse
from flask import request
from ...model.users import UserModel


class UserResource(Resource):
    def __init__(self, *agrs, **kwargs):
        super(UserResource, self).__init__(*agrs, **kwargs)
        self.parser = reqparse.RequestParser()
        self.userModel = UserModel()

    @staticmethod
    def readUserToken():
        token = request.cookies.get("token")
        return token
