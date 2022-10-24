from flask_restful import Api
from .user import User

def initializeApis(api: Api):
    api.add_resource(User, "/user")
