from . import AppResource
from ...model.followModal import FollowModal

class FollowResource(AppResource):
    def __init__(self, *args, **kwargs):
        super(FollowResource, self).__init__(*args, **kwargs)
        self.followModal = FollowModal()
