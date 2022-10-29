from flask import Flask
from flask_restful import Api
from .api import initializeApis

def getApp(registered_app=False):
    app = Flask(__name__)
    api = Api(app)
    initializeApis(api)
    if not registered_app:
        from .views import views
        app.register_blueprint(views)
    return app
