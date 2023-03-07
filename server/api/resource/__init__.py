from flask_restful import Resource
from flask_restful import reqparse
from flask import request
from ...model.users import UserModel
from flask import abort


class AppResource(Resource):
    def __init__(self, *args, **kwargs):
        super(AppResource, self).__init__(*args, **kwargs)
        self.parser = reqparse.RequestParser()
        token = self.readUserToken()
        if token is None:
            return abort(401, "Unauthenticated")
        self.token = token
    
    def readUserToken(self):
        token = request.cookies.get('token')
        isTokenValid = self.__varifyToken(token)
        if isTokenValid:
            return None
        return token

    @staticmethod
    def __varifyToken(token):
        userModal = UserModel()
        userData = userModal.read(token)
        if userData is not None:
            return True
        return False
