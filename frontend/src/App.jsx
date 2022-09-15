import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import HomePage from "./pages/home_page/HomePage.jsx";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    </React.Fragment>
  );
}

export default App;
