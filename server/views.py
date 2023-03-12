from flask import Blueprint, render_template, request, redirect, make_response, abort
from . import getApp
from flask_bcrypt import Bcrypt
from .model.users import UserModel
from .functions import *
import datetime
import random

views = Blueprint("views", __name__)
app = getApp(registered_app=True)
bcrypt = Bcrypt(app)


@views.route("/", methods=["GET"], endpoint='index')
@varifyLogin
def index():
    return returnTemplate()


@views.route("/setting", methods=["GET"], endpoint='setting')
@varifyLogin
def setting():
    return returnTemplate()


@views.route("/profile", methods=["GET"], endpoint='profile')
@varifyLogin
def profile():
    return returnTemplate()


@views.route("/login", methods=["GET", "POST"], endpoint='login')
def login():
    loginToken = getCookie("token")
    if loginToken is not None:
        return redirect("/")
    
    if request.method == "POST":
        userModel = UserModel()
        email = request.form.get("email")
        password = request.form.get("password")
        userData = userModel.read({"email": email})

        if userData is not None and bcrypt.check_password_hash(userData["password"], password):
            responce = make_response(redirect("/profile"))
            currentDate = datetime.datetime.now()
            expireDate = currentDate + datetime.timedelta(days=4)
            responce.set_cookie("token", str(userData["_id"]), expires=expireDate)
            return responce
    return returnTemplate()


@views.route("/create-account", methods=["GET", "POST"], endpoint='createAccount')
def createAccount():
    loginToken = getCookie("token")
    if loginToken is not None:
        return redirect("/")
    
    if request.method == "POST":
        userModel = UserModel()
        name = request.form.get("name")
        email = request.form.get("email")
        password = request.form.get("password")
        if (name != "" and email != "" and password != ""):
            crypt_password = bcrypt.generate_password_hash(password)
            hash_password = crypt_password.decode("utf-8")
            colors = ["red", "blue", "green", "violet", "orange", "purple"]
            keywords = getKeywords(name)
            users = {
                "name": removeWhiteSpace(name),
                "email": email,
                "profile_img": None,
                "password": hash_password,
                "color": random.choice(colors),
                "about": "",
                'tag_name': f"@{email[0:email.find('@')]}",
                'keywords': keywords
            }
            userModel.create(users)
            return redirect("/login")
        else:
            return abort(400)
    return returnTemplate()


@views.route('/logout')
def logout():
    responce = make_response(redirect('/login'))
    responce.set_cookie("token", '', expires=0)
    return responce
