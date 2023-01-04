from flask_restful import Resource
from flask_restful import reqparse
from ...model.posts import PostModel
from flask import request
from flask import abort



class PostResource(Resource):
    def __init__(self, *args, **kwargs):
        super(PostResource, self).__init__(*args, **kwargs)
        self.parser = reqparse.RequestParser()
        self.postModal = PostModel()
        token = self.readUserToken()
        if token is None:
            return abort(401, "Unauthenticated")
        self.token = token

    @staticmethod    
    def readUserToken():
        token = request.cookies.get('token')
        return token
