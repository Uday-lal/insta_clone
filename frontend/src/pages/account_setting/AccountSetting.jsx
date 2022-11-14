import React from "react";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AccountSetting(props) {
  const returnAvatar = () => {
    if (props.profileImg) {
      return (
        <Avatar
          src={props.profileImg}
          sx={{ width: 50, height: 50 }}
          alt="Profile Img"
        />
      );
    } else {
      return (
        <Avatar sx={{ bgcolor: props.color, width: 50, height: 50 }}>
          {props.userName[0]}
        </Avatar>
      );
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <div className="head" style={{ marginTop: "25px" }}>
          <h1 style={{ fontWeight: "bold" }}>Account Settings</h1>
          <p style={{ color: "grey" }}>Change your profile settings</p>
        </div>
      </Container>
      <Container
        style={{ backgroundColor: "white", marginTop: "25px" }}
        maxWidth="xl"
      >
        <h2 style={{ fontWeight: "bold" }}>General Info</h2>
        <div className="center">{returnAvatar()}</div>
        <Container maxWidth="lg">
          <form class="w-100 " action="#">
            <TextField
              label="Email"
              name="email"
              type="email"
              value={props.email}
              readonly
            />
            <TextField
              label="Name"
              name="name"
              type="text"
              value={props.name}
            />
            <TextField
              label="About"
              name="about"
              type="text"
              multiline
              value={props.about}
            />
            <div className="left">
              <Button variant="outlined" type="button">
                Reset
              </Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default AccountSetting;
