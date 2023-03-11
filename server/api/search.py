from .resource.usersResource import UserResource
from flask import request

class Search(UserResource):
    def __init__(self, *args, **kwargs):
        super(Search, self).__init__(*args, **kwargs)
    
    def get(self):
        query = request.args.get('q')
        if query is not None:
            data = self.userModel.readAll({"keywords": query})
