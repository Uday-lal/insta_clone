from bson.objectid import ObjectId
from .modal import Modal


class ReactionModal(Modal):
    def __init__(self) -> None:
        super().__init__(collectionName="reaction")
    
    def read(self, query: dict):
        pass
    
    def create(self, data: dict):
        pass

    def update(self, data: dict, id: ObjectId):
        pass

    def delete(self, id: ObjectId):
        pass
