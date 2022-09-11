from flask import Flask
from .views import views


def start_server():
    app = Flask(__name__)
    app.register_blueprint(views)
    return app
