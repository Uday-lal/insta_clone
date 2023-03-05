from .resource.postResource import PostResource
from flask import abort, request
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
        self.token = self.readUserToken()

    def get(self):
        postId = request.args.get('id')
        if postId is not None:
            postData = self.postModal.read({'_id': ObjectId(str(postId))})
            return postData, 200
        return self._getAllTheUserPost(), 200

    def _getAllTheUserPost(self):
        token = self.readUserToken()
        posts_cursor = self.postModal.readAll(token)
        posts = []
        for post in posts_cursor:
            timeFormat = TimeFormat(post["created_at"])
            timespan = timeFormat.getTimeSpan()
            post["_id"] = str(post['_id'])
            post['timespan'] = timespan
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

    def _deleteOldPostImg(self, postId : str) -> None:
        postData = self.postModal.read({"_id": ObjectId(postId)})
        imgContent = postData['img_content']
        filePath = os.path.join(os.getcwd(), 'server', 'static', 'uploads', 'posts', imgContent)
        if os.path.exists(filePath):
            os.remove(filePath)


    def put(self):
        self.parser.add_argument('post', type=str, help="post is required", location="form")
        self.parser.add_argument('id', type=str, help="post id is required", location="form")
        self.parser.add_argument('visibility', type=str, help="visibility is required", location="form")
        self.parser.add_argument(
            "img_content", 
            type=werkzeug.datastructures.FileStorage,
            location="files"
        )
        args = self.parser.parse_args()
        post = args['post']
        postId = args['id']
        visibility = args['visibility']
        img_content = args['img_content']
        if img_content is not None:
            self._deleteOldPostImg(postId)
            img_name = self._savePostImg(img_content)
        else:
            img_name = None

        updateData = {
            'post': post, 
            'visibility': visibility, 
            'img_content': img_name} if img_name is not None else {
            'post': post, 
            'visibility': visibility}
        isUpdateDone = self.postModal.update(postId, updateData)
        if isUpdateDone:
            return {'message': "Post updated successfully"}, 200
        return {'message': "Something went wrong :("}, 500
    
    def delete(self):
        self.parser.add_argument('id', type=str, help="post id is required", required=True)
        args = self.parser.parse_args()
        postId = ObjectId(args['id'])
        isDeleted = self.postModal.delete(postId)
        if isDeleted:
            return {'message': "Post deleted successfully"}, 200
        return {'message': "Something went wrong :("}, 500
