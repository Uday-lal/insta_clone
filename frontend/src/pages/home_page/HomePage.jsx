import React from "react";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";

function HomePage(props) {
  const returnAvatar = () => {
    if (props.profileImg) {
      return (
        <Avatar
          src={`/static/profile_imgs/${props.profileImg}`}
          alt="Profile Img"
        />
      );
    } else {
      return <Avatar sx={{ bgcolor: props.color }}>{props.userName[0]}</Avatar>;
    }
  };
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Container
          maxWidth="md"
          style={{
            padding: "20px 0px",
          }}
        >
          <Paper
            component="form"
            sx={{
              p: "10px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            {returnAvatar()}
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="What's on your mind?"
              inputProps={{ "aria-label": "what's on your mind" }}
            />
            <IconButton aria-label="add photos">
              <AddPhotoAlternateRoundedIcon />
            </IconButton>
          </Paper>
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default HomePage;
