import React from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
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
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";
import Card from "@mui/material/Card";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import useAvatar from "../hooks/useAvatar.jsx";
import Post from "../components/Post.jsx";
import { useState, useEffect } from "react";

function ProfilePage(props) {
  const [openModal, setOpenModal] = useState(false);
  const [postImage, setPostImage] = useState(null);
  const [showPostImg, setShowPostImg] = useState(false);
  const [postImgData, setPostImgData] = useState();
  const [postText, setPostText] = useState("");
  const [visiblty, setVisiblty] = useState();
  const [postData, setPostData] = useState([]);
  const [connectionData, setConnectionData] = useState();
  const url = "/api/post";

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
        setPostData(data);
      });
  }, []);

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
              <Card
                sx={{
                  padding: "30px 14px",
                }}
              >
                <div className="upper-postion flex">
                  <Box>
                    {useAvatar(
                      props.profileImg,
                      80,
                      80,
                      props.userName,
                      props.color,
                      25
                    )}
                  </Box>
                  <Box>
                    <Box className="flex" style={{ marginLeft: 10 }}>
                      <Box>
                        <h3 style={{ fontWeight: "revert" }}>
                          {props.userName}
                        </h3>
                        <p
                          className="text-secondary"
                          style={{ fontSize: 14, marginTop: 3 }}
                        >
                          {props.tagName}
                        </p>
                      </Box>
                      <Box>
                        {!props.isNotCurrentUserProfile &&
                          (!props.isYouFollowing ? (
                            <Button
                              variant="outlined"
                              sx={{ textTransform: "none" }}
                              style={{ marginLeft: 20 }}
                              startIcon={<PersonAddAltRoundedIcon />}
                              onClick={props.handleFollowRequest}
                            >
                              Follow
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              sx={{ textTransform: "none" }}
                              style={{ marginLeft: 20 }}
                              startIcon={<PersonRemoveAlt1RoundedIcon />}
                              onClick={props.handleUnfollowRequet}
                            >
                              Following
                            </Button>
                          ))}
                      </Box>
                    </Box>
                    <Box
                      className="flex"
                      style={{ marginLeft: 10, marginTop: 10 }}
                    >
                      <Box className="flex center">
                        <h4>{props.followersCount}</h4>
                        &nbsp;
                        <span
                          style={{ fontSize: 12 }}
                          className="text-secondary"
                        >
                          Followers
                        </span>
                      </Box>
                      <Box className="flex center" style={{ marginLeft: 10 }}>
                        <h4>{props.followingsCount}</h4>
                        &nbsp;
                        <span
                          style={{ fontSize: 12 }}
                          className="text-secondary"
                        >
                          Following
                        </span>
                      </Box>
                      <Box className="flex center" style={{ marginLeft: 10 }}>
                        <h4>{postData.length}</h4>
                        &nbsp;
                        <span
                          style={{ fontSize: 12 }}
                          className="text-secondary"
                        >
                          Post
                        </span>
                      </Box>
                    </Box>
                    <Box style={{ marginTop: 10, marginLeft: 10 }}>
                      <p
                        className="text-secondary"
                        style={{ fontSize: 15, fontWeight: "600" }}
                      >
                        {props.about}
                      </p>
                    </Box>
                  </Box>
                </div>
              </Card>
            </Grid>
            <Grid xs={6} item>
              {/* <Paper
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
              </Paper> */}
              <div className="post-container">
                {postData.map((post) => {
                  return (
                    <Post
                      id={post._id}
                      key={post._id}
                      userName={props.userName}
                      timespan={post.timespan}
                      profileImg={props.profileImg}
                      color={props.color}
                      imageContent={post.img_content}
                      textContent={post.post}
                      loves={post.loves}
                      isLoved={post.is_loved}
                      style={{
                        marginBottom: "20px",
                      }}
                    />
                  );
                })}
              </div>
            </Grid>
            <Grid xs={3} item>
              <Paper
                sx={{
                  width: "100%",
                  p: "10px",
                }}
              >
                <h3>People you follow</h3>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default ProfilePage;
