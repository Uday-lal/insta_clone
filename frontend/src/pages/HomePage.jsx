import React from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
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
import useAvatar from "../hooks/useAvatar.jsx";
import FormControl from "@mui/material/FormControl";
import ProfileCard from "../components/card/ProfileCard.jsx";
import Stories from "../components/Stories.jsx";
import IconButtons from "../components/UrsIconButtons.jsx";
import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { motion } from "framer-motion";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded";

function HomePage(props) {
  const [openModal, setOpenModal] = useState(false);
  const [postImage, setPostImage] = useState(null);
  const [showPostImg, setShowPostImg] = useState(false);
  const [postImgData, setPostImgData] = useState();
  const [postText, setPostText] = useState("");
  const [visiblty, setVisiblty] = useState();
  const [postData, setPostData] = useState([]);
  const [postButtonAnimation, setPostButtonAnimation] = useState({});
  const [imageButtonAnimation, setImageButtonAnimation] = useState({});
  const [textButtonAnimation, setTextButtonAnimation] = useState({});
  // Initial animation state
  const [imageButtonInitAnimation, setImageButtonInitAnimation] = useState({});
  const [textButtonInitAnimation, setTextButtonInitAnimation] = useState({});
  const [postButtonInitAnimation, setPostButtonInitAnimation] = useState({
    rotate: 0,
  });

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

  const handleClose = () => {
    setOpenModal(false);
  };

  const handlePostButtonClick = () => {
    if (postButtonAnimation.rotate === 45) {
      setPostButtonInitAnimation({ rotate: 45 });
      setPostButtonAnimation({ rotate: 0 });
    } else {
      setPostButtonAnimation({ rotate: 45 });
      setImageButtonInitAnimation({ y: 0 });
      setTextButtonInitAnimation({ y: 0 });
      imageButtonAnimation({ y: -20 });
      textButtonAnimation({ y: -40 });
    }
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
                tagName={props.tagName}
                color={props.color}
                followersCount={props.followersCount}
                followingsCount={props.followingsCount}
                postCount={0}
              />
            </Grid>
            <Grid xs={6} item>
              <Stories
                profileImg={props.profileImg}
                userName={props.userName}
                color={props.color}
              />
              <div className="post-container">{/* ... */}</div>
            </Grid>
            <Grid xs={3} item>
              <Paper
                sx={{
                  width: "100%",
                  p: "10px",
                  position: "sticky",
                  top: 90,
                }}
              >
                <h3>People you follow</h3>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <motion.div
        style={{
          position: "absolute",
          bottom: 1,
          right: 1,
          margin: "30px",
          zIndex: 5,
        }}
        initial={postButtonInitAnimation}
        animate={postButtonAnimation}
      >
        <IconButtons.PrimaryIconButton
          onClick={handlePostButtonClick}
          sx={{ padding: "20px" }}
        >
          <AddRoundedIcon
            sx={{ color: "white", width: "30px", height: "30px" }}
          />
        </IconButtons.PrimaryIconButton>
      </motion.div>
      <motion.div
        style={{
          position: "absolute",
          bottom: 1,
          right: 1,
          margin: "30px",
          zIndex: 1,
        }}
        initial={{ y: 0 }}
        animate={imageButtonAnimation}
      >
        <IconButtons.DangerIconButton sx={{ padding: "20px", zIndex: 1 }}>
          <AddPhotoAlternateRoundedIcon sx={{ color: "white" }} />
        </IconButtons.DangerIconButton>
      </motion.div>
      <motion.div
        style={{
          position: "absolute",
          bottom: 1,
          right: 1,
          margin: "30px",
          zIndex: 1,
        }}
        initial={{ y: 0 }}
        animate={textButtonAnimation}
      >
        <IconButtons.SuccessIconButton sx={{ padding: "20px" }}>
          <TextSnippetRoundedIcon sx={{ color: "white" }} />
        </IconButtons.SuccessIconButton>
      </motion.div>
    </React.Fragment>
  );
}

export default HomePage;
