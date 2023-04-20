from .resource.shareResource import ShareResource


class Shear(ShareResource):
    def __init__(self, *args, **kwargs):
        super(Shear, self).__init__(*args, **kwargs)
    
    def get(self):
        pass

    def post(self):
        pass
