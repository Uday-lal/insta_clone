from .resource.commentsResource import CommentResource
from flask import request, abort
from bson.objectid import ObjectId
from ..model.posts import PostModel
from ..helpers.timeFormat import TimeFormat
import time


class Comments(CommentResource):
    def __init__(self, *args, **kwargs):
        super(Comments, self).__init__(*args, **kwargs)
    
    def get(self):
        postId = request.args.get('post_id')
        commentId = request.args.get('comment_id')

        if postId is None:
            return abort(400, "Bad request")

        if not self.__varifyPostId(postId):
            return abort(400, "Bad request")

        comments = list(self.commentModal.readAll(
           ObjectId(postId)
        )) if commentId is None else list(self.commentModal.read({
            '_id': ObjectId(commentId)
        }))

        if commentId is not None:
            commentData = list(comments)
            if len(commentData) == 0:
                return {'message': 'Comment not found'}, 404
            commentData = commentData[0]
            timeFormat = TimeFormat(commentData['created_at'])
            created_at = timeFormat.getTimeSpan()
            commentData['created_at'] = created_at
            return commentData, 200
        else:
            if comments == 0:
                return {'message': 'Comment not found'}, 404
            for comment in comments:
                timeFormat = TimeFormat(comment['created_at'])
                created_at = timeFormat.getTimeSpan()
                comment['created_at'] = created_at
                comment['is_you'] = comment['user_id'] == self.token
        
        return comments, 200

    def post(self):
        self.parser.add_argument('post_id', type=str, help='post_id is required', required=True)
        self.parser.add_argument('comment', type=str, help='comment is required', required=True)
        args = self.parser.parse_args()
        postId = args['post_id']
        comment = args['comment']
        if comment == '':
            return {'message': 'Comment should not be empty'}, 204
        
        if postId == '':
            return {'message': 'Post id should not be empty'}, 204
        
        if not self.__varifyPostId(postId):
            return abort('Bad request'), 400

        user_id = self.token
        is_edited = False
        created_at = time.time()
        data = {
            'post_id': ObjectId(postId),
            'comment': comment,
            'user_id': ObjectId(user_id),
            'is_edited': is_edited,
            'created_at': created_at
        }

        self.commentModal.create(data)
        return {'message': 'Comment created successfully'}, 200


    @staticmethod
    def __varifyPostId(postId):
        postModal = PostModel()
        postData = postModal.read({"_id": ObjectId(postId)})
        if postData is None:
            return False
        return True

    def put(self):
        self.parser.add_argument('comment_id', type=str, help='comment_id is required', required=True)
        self.parser.add_argument('comment', type=str, help='comment is required', required=True)
        args = self.parser.parse_args()
        comment_id = args['comment_id']
        comment = args['comment']
        is_edited = True
        created_at = time.time()
        updated_data = {
            'comment': comment,
            'is_edited': is_edited,
            'created_at': created_at
        }
        isUpdateDone = self.commentModal.update(updated_data, ObjectId(comment_id))
        if isUpdateDone:
            return {'message': 'Comment updated successfully'}, 200
        return {'message': 'Something went wrong!!'}, 500

    def delete(self):
        self.parser.add_argument('comment_id', type=str, help='comment_id is required', required=True)
        args = self.parser.parse_args()
        commentId = args['comment_id']
        isDeletDone = self.commentModal.delete(ObjectId(commentId))

        if isDeletDone:
            return {'message': 'Comment deleted successfully'}, 200
        return {'message': 'Something went wrong!!'}, 500
