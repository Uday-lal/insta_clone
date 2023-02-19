from .resource.postResource import PostResource
from flask import abort
from PIL import Image
import werkzeug
import secrets
import os


class ContentImage(PostResource):
    def __init__(self, *args, **kwargs):
        super(PostResource, self).__init__(*args, **kwargs)

    def post(self):
        self.parser.add_argument(
            'contentImg',
            type=werkzeug.datastructures.FileStroage, 
            location='files', 
            required=True
        )
        args = self.parser.parse_args()
        contentImg = args["contentImg"]
        createData = {
            'img_content': contentImg
        }
        isCreateDone = self.postModal.create(createData)
        if isCreateDone:
            return {'message': 'Post created successfully'}, 200
        return {"message": "Something went wrong :("}, 500


    def _saveContentImg(self, image):
        _, fileExt = os.path.splitext(image.filename)
        imageName = secrets.token_hex(8) + fileExt
        filePath = os.path.join(os.getcwd(), 'server', 'static', 'profile_imgs', imageName)
        image = Image.open(image)
        # image.thumbnail(size)
        image.save(filePath)
        return imageName
