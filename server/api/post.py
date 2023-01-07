from .resource.postResource import PostResource
from flask import abort, redirect
from bson.objectid import ObjectId


class Post(PostResource):
    def __init__(self, *args, **kwargs):
        super(Post, self).__init__(*args, **kwargs)
    
    def get(self):
        pass

    def post(self):
        self.parser.add_argument('post', type=str, help="post is required", required=True, location="form")
        self.parser.add_argument('visibility', type=str, help="visibility is required", required=True, location="form")
        args = self.parser.parse_args()
        post = args['post']
        visibility = args['visibility']
        token = self.readUserToken()
        data = {
            "user_id": token,
            "post": post,
            "visibility": visibility,
            "img_content": ""
        }
        self.postModal.create(data)
        return redirect('/')

    def put(self):
        pass
    
    def delete(self):
        pass
