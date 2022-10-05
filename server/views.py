from flask import Blueprint, render_template, request, redirect
from . import getApp
from flask_bcrypt import Bcrypt

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


@views.route("/login", methods=["GET", "POST"])
def login():
    loginToken = getCookie("token")
    if loginToken is not None:
        return redirect("/")
    return returnTemplate()


@views.route("/create-account", methods=["GET", "POST"])
def createAccount():
    loginToken = getCookie("token")
    if loginToken is not None:
        return redirect("/")
    
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        password = request.form.get("password")
        crypt_password = bcrypt.generate_password_hash(password)
        hash_password = crypt_password.decode("utf-8")
    return returnTemplate()
