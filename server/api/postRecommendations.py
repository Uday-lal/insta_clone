from .resource.postResource import PostResource



class PostRecommendation(PostResource):
    def __init__(self, *args, **kwargs):
        super(PostRecommendation, self).__init__(*args, **kwargs)
    
    def get(self):
        pass
