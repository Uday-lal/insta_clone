from .resource.postResource import PostResource
from bson.objectid import ObjectId
from ..helpers.timeFormat import TimeFormat


class PostRecommendation(PostResource):
    def __init__(self, *args, **kwargs):
        super(PostRecommendation, self).__init__(*args, **kwargs)
    
    def get(self):
        postCousor = self.postModal.collection.aggregate(
            {
                '$match': {'following_id': ObjectId(self.token)}
            },
            {
                '$lookup': {
                    'from': 'posts',
                    'localField': 'user_id',
                    'foreignField': '_id',
                    'as': 'posts'
                }
            },
            {
                '$project': {
                    '_id': {
                        '$toString': '$_id'
                    },
                    'post': '$posts.post',
                    'visibility': '$posts.visibility',
                    'img_content': '$posts.img_content',
                    'created_at': '$posts.created_at'
                }
            },
            {'$unwind': '$post'},
            {'$unwind': '$visibility'},
            {'$unwind': '$img_content'},
            {'$unwind': '$created_at'},
        )

        for data in postCousor:
            timeFormat = TimeFormat(data['created_at'])
            data['timespan'] = timeFormat.getTimeSpan()
        
        return list(postCousor)
