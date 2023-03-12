from .resource.usersResource import UserResource
from flask import request

class Search(UserResource):
    def __init__(self, *args, **kwargs):
        super(Search, self).__init__(*args, **kwargs)
    
    def get(self):
        query = request.args.get('q')
        skips = 0 if request.args.get('skips') is None else int(request.args.get('skips'))
        limit = 10 if request.args.get('limit') is None else int(request.args.get('limit'))
        if query is not None:
            data = self.__getSearchData(query, skips*limit, limit)
            return data, 200

    def __getSearchData(self, qurey: str, skips: int, limit: int):
        data = self.userModel.collection.aggregate([
            {'$match': {'keywords': qurey}},
            {'$skip': skips},
            {'$limit': limit},
            {
                '$project': {
                    '_id': {
                        '$toString': '$_id'
                    },
                    'name': '$name',
                    'tag_name': '$tag_name',
                    'profile_img': '$profile_img',
                    'color': '$color',
                }
            }
        ])
        return list(data)
