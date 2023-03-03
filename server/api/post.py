from .resource.postResource import PostResource
from flask import abort, redirect
from bson.objectid import ObjectId
from PIL import Image
from ..helpers.timeFormat import TimeFormat
import secrets
import os
import time
import werkzeug


class Post(PostResource):
    def __init__(self, *args, **kwargs):
        super(Post, self).__init__(*args, **kwargs)

    def get(self):
        token = self.readUserToken()
        posts_cursor = self.postModal.readAll(token)
        posts = []
        for post in posts_cursor:
            timeFormat = TimeFormat(post["created_at"])
            timespan = timeFormat.getTimeSpan()
            post["_id"] = str(post['_id'])
            post['timestamp'] = timespan
            posts.append(post)

        return posts

    def post(self):
        self.parser.add_argument('post', type=str, help="post is required", required=True, location="form")
        self.parser.add_argument('visibility', type=str, help="visibility is required", required=True, location="form")
        self.parser.add_argument(
            "img_content", 
            type=werkzeug.datastructures.FileStorage,
            location="files"
        )
        args = self.parser.parse_args()
        post = args['post']
        visibility = args['visibility']
        img_content = args['img_content']
        if img_content is not None:
            img_name = self._savePostImg(img_content)
        else:
            img_name = None
        token = self.readUserToken()
        createdTime = time.time()
        data = {
            "user_id": token,
            "post": post,
            "visibility": visibility,
            "img_content": img_name,
            "created_at": createdTime
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
