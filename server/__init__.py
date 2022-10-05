from flask import Flask

def getApp(registered_app=False):
    app = Flask(__name__)
    if not registered_app:
        from .views import views
        app.register_blueprint(views)
    return app
