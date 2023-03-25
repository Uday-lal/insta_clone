from .resource.followResource import FollowResource
from bson.objectid import ObjectId
from ..helpers.timeFormat import TimeFormat
from ..model.loveModal import LoveModal


class PostRecommendation(FollowResource):
    def __init__(self, *args, **kwargs):
        super(PostRecommendation, self).__init__(*args, **kwargs)
    
    def get(self):
        postCousor = self.followModal.collection.aggregate([
            {
                '$match': {'user_id': ObjectId(self.token)}
            },
            {
                '$lookup': {
                    'from': 'posts',
                    'localField': 'following_id',
                    'foreignField': 'user_id',
                    'as': 'posts'
                }
            },
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'following_id',
                    'foreignField': '_id',
                    'as': 'users'
                }
            },
            {
                '$project': {
                    '_id': {
                        '$toString': '$_id'
                    },
                    'post_id': '$posts._id',
                    'post': '$posts.post',
                    'visibility': '$posts.visibility',
                    'img_content': '$posts.img_content',
                    'created_at': '$posts.created_at',
                    'username': '$users.name',
                    'tag_name': '$users.tag_name',
                    'profile_img': '$users.profile_img',
                    'user_id': '$users._id',
                    'color': '$users.color',
                }
            },
            {'$unwind': '$post'},
            {'$unwind': '$visibility'},
            {'$unwind': '$img_content'},
            {'$unwind': '$created_at'},
            {'$unwind': '$username'},
            {'$unwind': '$tag_name'},
            {'$unwind': '$profile_img'},
            {'$unwind': '$post_id'},
            {'$unwind': '$user_id'},
            {'$unwind': '$color'},
        ])
        postData = []
        loveModal = LoveModal()
        for data in postCousor:
            timeFormat = TimeFormat(data['created_at'])
            data['timespan'] = timeFormat.getTimeSpan()
            data['_id'] = str(data['post_id'])
            data['user_id'] = str(data['user_id'])
            loveCount = loveModal.getDataCount({'post_id': str(data['_id'])})
            isLoved = loveModal.isUserLovedPost(self.token, str(data['_id']))
            data['loves'] = loveCount
            data['is_loved'] = isLoved
            del data['post_id']
            postData.append(data)
        
        return postData
