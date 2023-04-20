from . import AppResource
from ...model.shareModal import ShareModal


class ShareResource(AppResource):
    def __init__(self, *args, **kwargs):
        super(ShareResource, self).__init__(*args, **kwargs)
        self.shearModal = ShareModal()
