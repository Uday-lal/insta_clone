import React from "react";
import { useState } from "react";
import Card from "../components/card/Card.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [errorType, setErrorType] = useState("");

  const openAlert = (message, errorType) => {
    setSnackMessage(message);
    setOpenSnackBar(true);
    setErrorType(errorType);
  };
  const submitData = (e) => {
    e.preventDefault();
    if (password == confirmPassword) {
      const formData = new FormData();
      const request = new XMLHttpRequest();
      formData.append("email", email);
      formData.append("name", name);
      formData.append("password", password);
      request.open("POST", "/create-account");
      request.send(formData);
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status == 200) {
          window.location.replace("/login");
        }
      };
    } else {
      openAlert("Password dose not match with confirm password", "error");
    }
  };
  return (
    <React.Fragment>
      <div className="page">
        <div className="center">
          <Card
            style={{
              width: "20vw",
              height: "50vh",
            }}
          >
            <p
              style={{
                margin: "15px 0px",
              }}
            >
              Already have a account? <a href="/login">Login</a>
            </p>
            <form
              method="POST"
              onSubmit={submitData}
              style={{
                width: "100%",
              }}
            >
              <TextField
                label="Enter Email"
                type="email"
                autoComplete="off"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                style={{
                  margin: "10px 0px",
                }}
                className="w-100"
                required="true"
              />
              <TextField
                label="Enter Name"
                type="text"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                name="name"
                sytle={{ margin: "10px 0px" }}
                className="w-100"
                required="true"
              />
              <TextField
                label="Enter Password"
                type="password"
                autoComplete="off"
                variant="outlined"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  margin: "10px 0px",
                }}
                className="w-100"
                required="true"
              />
              <TextField
                label="Confirm Password"
                type="password"
                autoComplete="off"
                variant="outlined"
                name="confirm_password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  margin: "10px 0px",
                }}
                className="w-100"
                required="true"
              />
              <Button
                variant="contained"
                style={{ width: "100%" }}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Card>
        </div>
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert
          onClose={() => setOpenSnackBar(false)}
          variant="filled"
          severity={errorType}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default CreateAccount;
