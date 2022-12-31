import React from "react";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import Grid from "@mui/material/Grid";

function HomePage(props) {
  const returnAvatar = () => {
    if (props.profileImg) {
      return (
        <Avatar
          src={`/static/profile_imgs/${props.profileImg}`}
          alt="Profile Img"
          sx={{ width: 80, height: 80 }}
        />
      );
    } else {
      return (
        <Avatar sx={{ bgcolor: props.color, width: 56, height: 56 }}>
          {props.userName[0]}
        </Avatar>
      );
    }
  };
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Container
          maxWidth="xl"
          style={{
            padding: "20px 0px",
          }}
        >
          <Grid
            style={{
              width: "100%",
            }}
            container
            spacing={2}
          >
            <Grid
              style={{
                width: "25%",
              }}
              item
            >
              <Card>
                <div
                  style={{
                    padding: "20px 0px",
                  }}
                  className="flex flex-column center"
                >
                  {returnAvatar()}
                  <div className="para-section flex flex-column center">
                    <h3 style={{ margin: "10px 0px" }}>{props.userName}</h3>
                    <p className="text-secondary">{props.about}</p>
                  </div>
                  <Grid
                    container
                    style={{
                      marginTop: "40px",
                      borderTop: "1px solid #D9D9D9",
                      padding: "10px",
                    }}
                    spacing={0}
                  >
                    <Grid
                      item
                      className="flex center"
                      style={{
                        width: "50%",
                        flexDirection: "column",
                        borderRight: "1px solid #D9D9D9",
                      }}
                    >
                      <h4 className="text-primary">100</h4>
                      <p className="text-secondary">Following</p>
                    </Grid>
                    <Grid
                      item
                      className="flex center"
                      style={{ width: "50%", flexDirection: "column" }}
                    >
                      <h4 className="text-primary">100</h4>
                      <p className="text-secondary">Followers</p>
                    </Grid>
                  </Grid>
                </div>
              </Card>
            </Grid>
            <Grid
              style={{
                width: "75%",
              }}
              item
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
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="What's on your mind?"
                  inputProps={{ "aria-label": "what's on your mind" }}
                />
                <IconButton aria-label="add photos">
                  <AddPhotoAlternateRoundedIcon />
                </IconButton>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default HomePage;
