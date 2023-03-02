import React from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import InputBase from "@mui/material/InputBase";
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
import useAvatar from "../hooks/useAvatar.jsx";
import Post from "../components/Post.jsx";
import { useState } from "react";

function ProfilePage(props) {
  const [openModal, setOpenModal] = useState(false);
  const [postImage, setPostImage] = useState(null);
  const [showPostImg, setShowPostImg] = useState(false);
  const [postImgData, setPostImgData] = useState();
  const [postText, setPostText] = useState("");
  const [visiblty, setVisiblty] = useState();
  const url = "/api/post";

  const handleClose = () => {
    setOpenModal(false);
  };

  const postContentImg = (img) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    setPostImgData(img);
    reader.onload = () => {
      setPostImage(reader.result);
      setShowPostImg(true);
      setOpenModal(true);
    };
  };

  const handlePostSubmit = function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("post", postText);
    formData.append("visibility", visiblty);
    formData.append("img_content", postImgData);
    fetch(url, {
      method: "POST",
      body: formData,
    }).then((responce) => {
      if (responce.ok) {
        window.location.reload();
      }
    });
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
        <form onSubmit={handlePostSubmit} method="POST">
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                marginBottom: "10px",
              }}
            >
              {useAvatar(props.profileImg, 40, 40, props.userName, props.color)}
              <Box>
                <h3 style={{ marginLeft: "10px" }}>{props.userName}</h3>
              </Box>
            </Box>
            <div
              style={{
                backgroundImage: `url(${postImage})`,
                width: "100%",
                height: "250px",
                display: !showPostImg ? "none" : "block",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <TextField
              autoFocus
              margin="dense"
              id="post"
              name="post"
              label="What you want to say?"
              multiline
              variant="filled"
              onChange={(e) => setPostText(e.target.value)}
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
                onChange={(e) => setVisiblty(e.target.value)}
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
            spacing={5}
          >
            <Grid xs={3} item>
              <ProfileCard
                profileImg={props.profileImg}
                userName={props.userName}
                about={props.about}
              />
            </Grid>
            <Grid xs={6} item>
              <Paper
                component="form"
                sx={{
                  p: "10px",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {useAvatar(
                  props.profileImg,
                  40,
                  40,
                  props.userName,
                  props.color
                )}
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="What's on your mind?"
                  readOnly
                  onClick={() => {
                    setPostImage("");
                    setShowPostImg(false);
                    setOpenModal(true);
                  }}
                  inputProps={{ "aria-label": "what's on your mind" }}
                />
                <IconButton aria-label="add photos" component="label">
                  <input
                    type="file"
                    name="contentImg"
                    hidden
                    onChange={(e) => {
                      postContentImg(e.target.files[0]);
                    }}
                    accept="image/*"
                  />
                  <AddPhotoAlternateRoundedIcon />
                </IconButton>
              </Paper>
              <div className="post-container">
                <Post
                  id="test"
                  userName={props.userName}
                  timepass="4h"
                  profileImg={props.profileImg}
                  color={props.color}
                  style={{
                    marginTop: "20px",
                  }}
                />
              </div>
            </Grid>
            <Grid xs={3} item>
              <Paper
                sx={{
                  width: "100%",
                  p: "10px",
                }}
              ></Paper>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default ProfilePage;