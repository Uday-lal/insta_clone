import React from "react";
import Card from "../../components/card/Card.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function CreateAccount() {
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
              action="/create-account"
              style={{
                width: "100%",
              }}
            >
              <TextField
                label="Enter Email"
                type="email"
                autoComplete="off"
                variant="outlined"
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
    </React.Fragment>
  );
}

export default CreateAccount;
