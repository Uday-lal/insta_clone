from . import DB
from bson.objectid import ObjectId


class Modal:
    def __init__(self, *args, **kwargs):
        collectionName = kwargs.get('collectionName')
        self.collection = DB[collectionName]

    def read(self, query: dict) -> dict:
        pass

    def create(self, data: dict) -> None:
        pass

    def update(self, data: dict, id: ObjectId) -> bool:
        pass

    def delete(self, id: ObjectId) -> None:
        pass
