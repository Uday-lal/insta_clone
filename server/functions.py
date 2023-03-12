from flask import render_template, request, redirect


def getCookie(name: str):
    return request.cookies.get(name)


def returnTemplate():
    return render_template("index.html")


def varifyLogin(function):
    def decorator(*args, **kwargs):
        loginToken = getCookie("token")
        if loginToken is None:
            return redirect("login")
        return function(*args, **kwargs)

    return decorator


def removeWhiteSpace(words):
    index = 0
    for word in words:
        if word != " ":
            break
        index += 1
    return words[index:]


def getKeywords(userName: str):
    keywords = [userName]
    keywords.append(userName.upper())
    keywords.append(userName.lower())
    upperCase = userName.upper()
    lowerCase = userName.lower()
    if " " in userName:
        userNameSplit = userName.split(" ")
        for word in userNameSplit:
            if word not in keywords:
                keywords.append(word)
            if word.upper() not in keywords:
                keywords.append(word.upper())
            if word.lower() not in keywords:
                keywords.append(word.lower())
    
    for upper in upperCase:
        if upper != " ":
            keywords.append(upper)
    
    for lower in lowerCase:
        if lower != " ":
            keywords.append(lower)
    
    for char in userName:
        if char != " ":
            keywords.append(char)
    
    return keywords
