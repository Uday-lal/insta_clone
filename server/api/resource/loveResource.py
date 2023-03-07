from . import AppResource
from ...model.loveModal import LoveModal


class LoveResource(AppResource):
    def __init__(self, *args, **kwargs):
        super(LoveResource, self).__init__(*args, **kwargs)
        self.loveModal = LoveModal()
