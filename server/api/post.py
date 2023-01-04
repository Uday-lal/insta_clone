from .resource.postResource import PostResource
from flask import abort
from bson.objectid import ObjectId


class Post(PostResource):
    def __init__(self, *args, **kwargs):
        super(Post, self).__init__(*args, **kwargs)
    
    def get(self):
        pass

    def post(self):
        pass
    
    def put(self):
        pass
    
    def delete(self):
        pass
