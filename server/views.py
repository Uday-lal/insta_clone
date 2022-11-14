from flask import Blueprint, render_template, request, redirect, make_response, abort
from . import getApp
from flask_bcrypt import Bcrypt
from .model.users import UserModel
import datetime
import random

views = Blueprint("views", __name__)
app = getApp(registered_app=True)
bcrypt = Bcrypt(app)

def getCookie(name: str):
    return request.cookies.get(name)

def returnTemplate():
    return render_template("index.html")


@views.route("/", methods=["GET"])
def index():
    loginToken = getCookie("token")
    if loginToken is None:
        return redirect("login")
    return returnTemplate()


@views.route("/setting", methods=["GET"])
def setting():
    loginToken = getCookie("token")
    if loginToken is None:
        return redirect("login")
    return returnTemplate()


@views.route("/login", methods=["GET", "POST"])
def login():
    loginToken = getCookie("token")
    if loginToken is not None:
        return redirect("/")
    
    if request.method == "POST":
        userModel = UserModel()
        email = request.form.get("email")
        password = request.form.get("password")
        userData = userModel.read({"email": email})

        if bcrypt.check_password_hash(userData["password"], password):
            responce = make_response(redirect("/"))
            currentDate = datetime.datetime.now()
            expireDate = currentDate + datetime.timedelta(days=4)
            responce.set_cookie("token", str(userData["_id"]), expires=expireDate)
            return responce
    return returnTemplate()


@views.route("/create-account", methods=["GET", "POST"])
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
            colors = ["red", "blue", "green", "yellow", "orange", "purple"]
            users = {
                "name": removeWhiteSpace(name),
                "email": email,
                "profile_img": None,
                "password": hash_password,
                "color": random.choice(colors),
                "about": ""
            }
            userModel.create(users)
            return redirect("/login")
        else:
            return abort(400)
    return returnTemplate()


def removeWhiteSpace(words):
    index = 0
    for word in words:
        if word != " ":
            break
        index += 1
    return words[index:]
