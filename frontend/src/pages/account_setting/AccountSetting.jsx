import React from "react";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FilterRoundedIcon from "@mui/icons-material/FilterRounded";
import { useEffect, useState } from "react";

function AccountSetting(props) {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [about, setAbout] = useState();
  const [profileImg, setProfileImg] = useState();
  const url = "/api/user";
  const reset = function () {
    setAbout("");
    setUserName("");
  };

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    })
      .then((responce) => {
        if (responce.ok) {
          return responce.json();
        }
      })
      .then((data) => {
        setUserName(data.name);
        setEmail(data.email);
        setAbout(data.about);
      });
  }, []);

  const returnAvatar = () => {
    if (props.profileImg) {
      return (
        <div className="avatar_container">
          <Avatar
            src={`/static/profile_imgs/${props.profileImg}`}
            sx={{ width: 100, height: 100 }}
            alt="Profile Img"
          />
        </div>
      );
    } else {
      return (
        <div className="avatar_container">
          <Avatar sx={{ bgcolor: props.color, width: 50, height: 50 }}>
            {props.userName[0]}
          </Avatar>
        </div>
      );
    }
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("about", about);
    formData.append("profileImg", profileImg);
    fetch(url, {
      method: "PUT",
      body: formData,
    }).then((responce) => {
      if (responce.ok) {
        window.location.reload();
      }
    });
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
          <form
            class="w-100"
            enctype="multipart/form-data"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Grid
              container
              className="w-100 center"
              style={{
                margin: "20px",
              }}
              spacing={2}
            >
              <Grid item xs={10}>
                <TextField
                  label="Email"
                  name="email"
                  style={{ width: "100%" }}
                  type="email"
                  value={email}
                  variant="filled"
                  autoFocus={true}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  label="Name"
                  style={{ width: "100%" }}
                  name="name"
                  type="text"
                  variant="filled"
                  autoFocus={true}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  label="About"
                  style={{ width: "100%" }}
                  name="about"
                  rows={4}
                  type="text"
                  multiline
                  variant="filled"
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                />
              </Grid>
              <Grid item xs={10}>
                <Button variant="contained" component="label">
                  <FilterRoundedIcon />
                  Profile Image
                  <input
                    type="file"
                    name="profile_img"
                    hidden
                    onChange={(e) => setProfileImg(e.target.files[0])}
                    accept="image/*"
                  />
                </Button>
              </Grid>
            </Grid>
            <div className="left">
              <Button
                variant="outlined"
                style={{ margin: "10px" }}
                onClick={reset}
                type="button"
              >
                Reset
              </Button>
              <Button
                style={{ margin: "10px" }}
                variant="contained"
                type="submit"
              >
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
