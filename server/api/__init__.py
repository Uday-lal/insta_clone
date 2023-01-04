from flask_restful import Api
from .user import User
from .post import Post

def initializeApis(api: Api):
    api.add_resource(User, "/api/user")
    api.add_resource(Post, "/api/post")
