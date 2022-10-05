from . import DB


class UserModel:
    def __init__(self) -> None:
        self.users = DB["users"]
    
    def read(self, query):
        data = self.users.find_one(query)
        return data

    def create(self, data: dict):
        self.users.create_index("email", unique=True)
        self.users.insert_one(data) 

    def update(self):
        pass

    def delete(self):
        pass
