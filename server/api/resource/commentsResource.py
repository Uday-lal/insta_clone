from . import AppResource
from ...model.commentModal import CommentModal


class CommentResource(AppResource):
    def __init__(self, *args, **kwargs):
        super(CommentResource, self).__init__(*args, **kwargs)
        self.commentModal = CommentModal()
