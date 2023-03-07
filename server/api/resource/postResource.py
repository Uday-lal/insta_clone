from ...model.posts import PostModel
from . import AppResource




class PostResource(AppResource):
    def __init__(self, *args, **kwargs):
        super(PostResource, self).__init__(*args, **kwargs)
        self.postModal = PostModel()
