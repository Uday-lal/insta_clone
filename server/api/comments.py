from .resource.commentsResource import CommentResource
from flask import request, abort
from bson.objectid import ObjectId
import time


class Comments(CommentResource):
    def __init__(self, *args, **kwargs):
        super(CommentResource, self).__init__(*args, **kwargs)
    
    def get(self):
        postId = request.args.get('post_id')
        commentId = request.args.get('comment_id')

        if postId is None:
            return abort(400, "Bad request")

        comments = self.commentModal.readAll(
            {'post_id': postId}
        ) if commentId is None else self.commentModal.read({
            '_id': ObjectId(commentId)
        })

        return comments, 200

    def post(self):
        self.parser.add_argument('post_id', type=str, help='post_id is required', required=True)
        self.parser.add_argument('comment', type=str, help='comment is required', required=True)
        args = self.parser.parse_args()
        postId = args['post_id']
        comment = args['comment']
        user_id = self.token
