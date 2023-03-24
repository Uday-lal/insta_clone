from flask_restful import Api
from .user import User
from .post import Post
from .userProfileImg import UserProfileImg
from .contentImage import ContentImage
from .follow import Follow
from .love import Love
from .comments import Comments
from .search import Search
from .postRecommendations import PostRecommendation

def initializeApis(api: Api):
    api.add_resource(User, "/api/user")
    api.add_resource(Post, "/api/post")
    api.add_resource(UserProfileImg, "/api/userProfileImg")
    api.add_resource(ContentImage, "/api/contentImage")
    api.add_resource(Love, "/api/love")
    api.add_resource(Follow, "/api/follow")
    api.add_resource(Search, "/api/search")
    api.add_resource(Comments, "/api/comments")
    api.add_resource(PostRecommendation, "/api/post_recommendation")
