from .resource.loveResource import LoveResource
from flask import abort

class Love(LoveResource):
    def __init__(self, *args, **kwargs):
        super(Love, self).__init__(*args, **kwargs)
        self.token = self.readUserToken()

    def post(self):
        self.parser.add_argument('post_id', type=str, required=True, help="Post id is require and it is a string")
        args = self.parser.parse_args()
        postId = args['post_id']
        self.__postValidation(postId)
        try:
            self.loveModal.create({'user_id': self.token, 'post_id': postId})
            return {'message': 'Love successfully recored'}, 200
        except Exception as e:
            return {'message': e}, 500

    def __postValidation(self, post_id):
        loveCount = self.loveModal.getDataCount({'user_id': self.token, 'post_id': post_id})
        if loveCount > 0:
            return abort(406, "Already love posted")
