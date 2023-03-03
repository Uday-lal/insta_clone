import React from "react";
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
import ProfileCard from "../components/card/ProfileCard.jsx";
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
              required={true}
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
                required={true}
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
            <Button variant="outlined" type="submit">
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
              <ProfileCard
                profileImg={props.profileImg}
                userName={props.userName}
                about={props.about}
              />
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
