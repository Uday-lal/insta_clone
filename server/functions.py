from flask import render_template, request, redirect


def getCookie(name: str):
    return request.cookies.get(name)


def returnTemplate():
    return render_template("index.html")


def varifyLogin(function):
    def decorator():
        loginToken = getCookie("token")
        if loginToken is None:
            return redirect("login")
        function()

    return decorator


def removeWhiteSpace(words):
    index = 0
    for word in words:
        if word != " ":
            break
        index += 1
    return words[index:]
