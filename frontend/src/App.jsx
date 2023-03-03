import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import CreateAccount from "./pages/CreateAccount.jsx";
import HomePage from "./pages/HomePage.jsx";
import React from "react";
import ResponsiveAppBar from "./components/appBar.jsx";
import Collapse from "@mui/material/Collapse";
import AccountSetting from "./pages/AccountSetting.jsx";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ProfilePage from "./pages/ProfilePage.jsx";
import { useEffect, useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [profileColor, setProfileColor] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

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
        setOpenAlert(true);
        setAlertStatus("error");
        setAlertMessage("Something went wrong!! Please try again :(");
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
                <HomePage
                  userName={username}
                  profileImg={profileImg}
                  color={profileColor}
                  about={about}
                />
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
            <Route path="/profile">
              <div className="page">
                <ResponsiveAppBar
                  userName={username}
                  profileImg={profileImg}
                  color={profileColor}
                />
                <ProfilePage
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
      <Collapse in={openAlert}>
        <Alert
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity={alertStatus}
        >
          {alertMessage}
        </Alert>
      </Collapse>
    </React.Fragment>
  );
}

export default App;
