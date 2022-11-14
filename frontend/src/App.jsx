import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import CreateAccount from "./pages/create_account/CreateAccount.jsx";
import HomePage from "./pages/home_page/HomePage.jsx";
import React from "react";
import ResponsiveAppBar from "./components/appBar/appBar.jsx";
import AccountSetting from "./pages/account_setting/AccountSetting.jsx";
import { useEffect, useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [profileColor, setProfileColor] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const url = "/api/user";
    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }).then((responce) => {
      if (responce.ok) {
        responce.json().then((data) => {
          setUsername(data.name);
          setProfileImg(data.profile_img);
          setProfileColor(data.profile_color);
          setAbout(data.about);
          setEmail(data.email);
        });
      } else {
        // ...
      }
    });
  }, []);

  return (
    <React.Fragment>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <div className="page">
                <ResponsiveAppBar
                  userName={username}
                  profileImg={profileImg}
                  color={profileColor}
                />
                <HomePage />
              </div>
            </Route>
            <Route path="/setting">
              <div className="page">
                <ResponsiveAppBar
                  userName={username}
                  profileImg={profileImg}
                  color={profileColor}
                />
                <AccountSetting
                  userName={username}
                  profileImg={profileImg}
                  color={profileColor}
                  name={username}
                  email={email}
                  about={about}
                />
              </div>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/create-account">
              <CreateAccount />
            </Route>
          </Switch>
        </Router>
      </div>
    </React.Fragment>
  );
}

export default App;
