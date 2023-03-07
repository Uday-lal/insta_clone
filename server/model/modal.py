from . import DB
from bson.objectid import ObjectId


class Modal:
    def __init__(self, *args, **kwargs):
        collectionName = kwargs.get('collectionName')
        validator = kwargs.get('validator')
        self.collection = DB[collectionName]
        DB.command('collMod', collectionName, validator=validator)

    def read(self, query: dict) -> dict:
        pass

    def create(self, data: dict) -> None:
        pass

    def update(self, data: dict, id: ObjectId) -> bool:
        pass

    def delete(self, id: ObjectId) -> bool:
        pass
