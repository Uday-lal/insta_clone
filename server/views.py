from flask import Blueprint, render_template, request, redirect

views = Blueprint("views", __name__)


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
