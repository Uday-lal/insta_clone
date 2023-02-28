from .resource.postResource import PostResource
from flask import abort, redirect
from bson.objectid import ObjectId
from PIL import Image
import secrets
import os
import werkzeug


class Post(PostResource):
    def __init__(self, *args, **kwargs):
        super(Post, self).__init__(*args, **kwargs)
    
    def get(self):
        token = self.readUserToken()

    def post(self):
        self.parser.add_argument('post', type=str, help="post is required", required=True, location="form")
        self.parser.add_argument('visibility', type=str, help="visibility is required", required=True, location="form")
        self.parser.add_argument(
            "img_content", 
            type=werkzeug.datastructures.FileStorage,
            location="files",
            required=True
        )
        args = self.parser.parse_args()
        post = args['post']
        visibility = args['visibility']
        img_content = args['img_content']
        img_name = self._savePostImg(img_content)
        token = self.readUserToken()
        data = {
            "user_id": token,
            "post": post,
            "visibility": visibility,
            "img_content": img_name
        }
        self.postModal.create(data)
        return {'message': 'Post created successfully'}, 200
    
    def _savePostImg(self, postImg):
        _, fileExt = os.path.splitext(postImg.filename)
        imageName = secrets.token_hex(8) + fileExt
        filePath = os.path.join(os.getcwd(), 'server', 'static', 'uploads', 'posts', imageName)
        image = Image.open(postImg)
        image.save(filePath)
        return imageName


    def put(self):
        pass
    
    def delete(self):
        pass
