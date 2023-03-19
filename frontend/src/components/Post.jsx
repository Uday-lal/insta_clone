import React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import useAvatar from "../hooks/useAvatar.jsx";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import SendIcon from "@mui/icons-material/Send";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const useStyles = makeStyles({
  topScrollPaper: {
    alignItems: "flex-start",
  },
  topPaperScrollBody: {
    verticalAlign: "top",
  },
});

function Post(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [postText, setPostText] = useState();
  const [visiblty, setVisiblty] = useState();
  const [postImg, setPostImg] = useState();
  const [postImgData, setPostImgData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [loveCount, setLoveCount] = useState(props.loves);
  const classes = useStyles();
  const [isLoved, setIsLoved] = useState(props.isLoved);
  const [loveIcon, setLoveIcon] = isLoved
    ? useState(<FavoriteRoundedIcon />)
    : useState(<FavoriteBorderRoundedIcon />);
  const [comments, setComments] = useState([]);

  const handleClose = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  };

  useEffect(() => {
    getComments();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("post", postText);
    formData.append("visibility", visiblty);
    formData.append("img_content", postImgData);
    fetch(`/api/post?id=${props.id}`, {
      method: "PUT",
      body: formData,
    }).then((response) => {
      if (response.ok) {
        window.location.reload();
      } else {
        alert("Something went wrong. Please try again!");
      }
    });
  };

  const removePhoto = () => {
    setPostImg(null);
    setPostImgData(null);
  };

  const getPostData = (id) => {
    setMenuOpen(false);
    fetch(`/api/post?id=${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Something went worng :(");
        }
      })
      .then((data) => {
        setPostText(data.post);
        setVisiblty(data.visibility);
        if (data.img_content) {
          setPostImg(`/static/uploads/posts/${data.img_content}`);
        }
        setOpenModal(true);
      });
  };

  const sendDeleteRequest = () => {
    const isConfirmed = confirm("Are you sure you want to delete the post?");
    if (isConfirmed) {
      fetch(`/api/post?id=${props.id}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          alert("Something went wrong :(");
        }
      });
    }
  };

  const updatePostImg = (img) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    setPostImgData(img);
    reader.onload = () => setPostImg(reader.result);
  };

  const sendLoveRequest = () => {
    fetch("/api/love", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ post_id: props.id }),
    }).then((res) => {
      if (res.ok) {
        isLoved ? setLoveCount(loveCount - 1) : setLoveCount(loveCount + 1);
        setIsLoved(!isLoved);
        isLoved
          ? setLoveIcon(<FavoriteBorderRoundedIcon />)
          : setLoveIcon(<FavoriteRoundedIcon />);
      } else {
        alert("Something went wrong :(");
      }
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = formData.get("comment");

    fetch("/api/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        comment: comment,
        post_id: props.id,
      }),
    }).then((response) => {
      if (response.ok) {
        window.location.reload();
      } else {
        alert("Something went wrong :(");
      }
    });
  };

  const getComments = () => {
    fetch(`/api/comments?post_id=${props.id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Something went wrong :( !! Please reload the page");
        }
      })
      .then((data) => {
        setComments(data);
      });
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <DialogTitle>Update Post</DialogTitle>
        <form onSubmit={handleUpdate}>
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
            {postImg && (
              <div
                style={{
                  backgroundImage: `url(${postImg})`,
                  width: "100%",
                  height: "250px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "1px",
                    right: "1px",
                    display: "flex",
                  }}
                >
                  <Tooltip title="Update Photo">
                    <IconButton component="label">
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => updatePostImg(e.target.files[0])}
                      />
                      <AddPhotoAlternateRoundedIcon
                        className="background-primary"
                        style={{
                          padding: "10px",
                          color: "white",
                          borderRadius: "100px",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Remove Photo">
                    <IconButton onClick={removePhoto}>
                      <ClearRoundedIcon
                        style={{
                          padding: "10px",
                          color: "white",
                          borderRadius: "100px",
                          backgroundColor: "red",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            )}
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
              value={postText}
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
                value={visiblty}
                label="Visibility"
              >
                <MenuItem value={0}>Anyone</MenuItem>
                <MenuItem value={1}>Only Followers</MenuItem>
              </Select>
            </FormControl>
            {!postImg && (
              <Button
                startIcon={<AddPhotoAlternateRoundedIcon />}
                component="label"
                style={{ margin: "10px 0px" }}
                color="primary"
                variant="contained"
              >
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => updatePostImg(e.target.files[0])}
                />
              </Button>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button variant="outlined" type="submit">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        fullWidth={true}
        open={openComments}
        maxWidth="lg"
        onClose={() => setOpenComments(false)}
        sx={{
          maxHeight: "60vh",
        }}
        scroll="paper"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <DialogTitle>Comments</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <div className="comments">
            <List sx={{ width: "100%" }}>
              {comments.map((comment) => (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      {useAvatar(
                        comment.profile_img,
                        null,
                        null,
                        comment.username,
                        comment.color,
                        null
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <div
                          className="flex justify-content-space-between"
                          style={{ alignItems: "end" }}
                        >
                          <div style={{ display: "flex" }}>
                            <Tooltip title="View Profile">
                              <a
                                href={`/profile/${comment.tag_name}`}
                                style={{
                                  fontWeight: "bold",
                                  color: "black",
                                  fontSize: 16,
                                }}
                              >
                                {comment.username}
                              </a>
                            </Tooltip>
                            <p
                              className="text-secondary"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "14px",
                              }}
                            >
                              <AccessTimeRoundedIcon
                                sx={{ marginLeft: "5px", fontSize: "14px" }}
                              />
                              {comment.created_at} ago
                            </p>
                          </div>
                          {comment.is_you && (
                            <Tooltip title="Edit Comment">
                              <IconButton
                                aria-label="more"
                                aria-haspopup="true"
                                size="small"
                              >
                                <MoreVertRoundedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </div>
                      }
                      secondary={
                        <p style={{ color: "black" }}>{comment.comment}</p>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))}
            </List>
          </div>
        </DialogContent>
        <DialogActions sx={{ display: "block" }}>
          <div
            className="comment-input"
            style={{ position: "sticky", bottom: 1 }}
          >
            <div className="post-comments flex">
              {useAvatar(props.profileImg, 39, 39, props.userName, props.color)}
              <form class="w-100" onSubmit={handleCommentSubmit}>
                <div
                  className="flex w-100"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "100px",
                    marginLeft: "8px",
                  }}
                >
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      padding: "10px",
                      borderRadius: "20px",
                    }}
                    name="comment"
                    required
                    autoComplete="off"
                    placeholder="What's your comment"
                  />
                  <Button
                    style={{ borderRadius: "100px" }}
                    size="small"
                    variant="contained"
                    type="submit"
                  >
                    <SendIcon />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </DialogActions>
      </Dialog>
      <Card
        sx={{
          width: "100%",
          p: "10px",
        }}
        style={props.style}
        id={props.id}
      >
        <div className="w-100 flex justify-content-space-between">
          <div className="flex">
            <div>
              {useAvatar(props.profileImg, 40, 40, props.userName, props.color)}
            </div>
            <div style={{ marginLeft: "10px" }}>
              <Tooltip title={`View ${props.userName}'s profile`}>
                <a
                  href="#"
                  style={{
                    fontWeight: "bold",
                    marginBottom: "2px",
                    color: "black",
                  }}
                >
                  {props.userName}
                </a>
              </Tooltip>
              <p
                className="text-secondary"
                style={{ display: "flex", alignItems: "center" }}
              >
                <AccessTimeRoundedIcon sx={{ width: "15px", height: "15px" }} />
                &nbsp;
                {props.timespan} ago
              </p>
            </div>
          </div>
          <Tooltip title="Edit Post">
            <IconButton
              aria-controls={menuOpen ? "edit-post" : undefined}
              aria-expanded={menuOpen ? "true" : undefined}
              aria-label="more"
              aria-haspopup="true"
              onClick={(e) => {
                setMenuOpen(true);
                setAnchorEl(e.currentTarget);
              }}
            >
              <MoreVertRoundedIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="post-content">
          <p style={{ marginTop: "20px" }}>{props.textContent}</p>
          {props.imageContent && (
            <img
              src={`/static/uploads/posts/${props.imageContent}`}
              style={{
                width: "100%",
              }}
            />
          )}
        </div>
        <div className="post-reactions flex justify-content-space-between w-100">
          <Button
            style={{ textTransform: "none" }}
            color="error"
            startIcon={loveIcon}
            onClick={sendLoveRequest}
          >
            Love {loveCount}
          </Button>
          <Button
            style={{ textTransform: "none" }}
            startIcon={<CommentRoundedIcon />}
            onClick={() => setOpenComments(true)}
          >
            Comments {comments.length}
          </Button>
          <Button
            style={{ textTransform: "none", color: "black" }}
            startIcon={<ShareRoundedIcon />}
          >
            Share 200
          </Button>
        </div>
      </Card>
      <Menu
        id="edit-post"
        MenuListProps={{
          "aria-labelledby": "edit-post",
        }}
        open={menuOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "20ch",
          },
        }}
      >
        <MenuItem
          style={{ color: "#1976d2" }}
          onClick={() => getPostData(props.id)}
        >
          <EditRoundedIcon />
          &nbsp; Edit
        </MenuItem>
        <MenuItem style={{ color: "red" }} onClick={sendDeleteRequest}>
          <DeleteRoundedIcon /> &nbsp; Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default Post;
