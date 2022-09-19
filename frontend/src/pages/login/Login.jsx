import React from "react";
import Card from "../../components/card/Card.jsx";
import TextField from "@mui/material/TextField";

function Login() {
  return (
    <React.Fragment>
      <div className="page">
        <div className="center">
          <Card>
            <form>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
            </form>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
