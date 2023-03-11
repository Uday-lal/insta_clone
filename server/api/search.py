from .resource.usersResource import UsersResource
from flask import request

class Search(UsersResource):
    def __init__(self, *args, **kwargs):
        super(Search, self).__init__(*args, **kwargs)
    
    def get(self):
        query = request.args.get('q')
        if query is not None:
            pass
