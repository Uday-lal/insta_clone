import React from "react";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";

function HomePage(props) {
  const [openModal, setOpenModal] = useState(false);
  const returnAvatar = (width, height) => {
    if (props.profileImg) {
      return (
        <Avatar
          src={`/static/profile_imgs/${props.profileImg}`}
          alt="Profile Img"
          sx={{ width: width, height: height }}
        />
      );
    } else {
      return (
        <Avatar sx={{ bgcolor: props.color, width: width, height: height }}>
          {props.userName[0]}
        </Avatar>
      );
    }
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={openModal}
        onClose={handleClose}
      >
        <DialogTitle>Post</DialogTitle>
        <form action="/api/post" method="POST">
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                marginBottom: "10px",
              }}
            >
              {returnAvatar(40, 40)}
              <Box>
                <h3 style={{ marginLeft: "10px" }}>{props.userName}</h3>
              </Box>
            </Box>
            <TextField
              autoFocus
              margin="dense"
              id="post"
              name="post"
              label="What you want to say?"
              multiline
              variant="filled"
              rows={6}
              fullWidth
              sx={{ margin: "20px 0px" }}
            />
            <FormControl fullWidth>
              <InputLabel
                id="visibility-label"
                style={{ display: "flex", alignItems: "center" }}
              >
                Visibility
              </InputLabel>
              <Select
                labelId="visibility-label"
                id="visibility"
                name="visibility"
                label="Visibility"
              >
                <MenuItem value={0}>Anyone</MenuItem>
                <MenuItem value={1}>Only Followers</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outlined" type="submit" onClick={handleClose}>
              Post
            </Button>
          </DialogActions>
        </form>
      </Dialog>

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
                  {returnAvatar(80, 80)}
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
                {returnAvatar(40, 40)}
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="What's on your mind?"
                  readOnly
                  onClick={() => setOpenModal(true)}
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
