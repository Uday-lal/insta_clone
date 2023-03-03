import React from "react";
import { useState } from "react";
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

function Post(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
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
              id="edit-post"
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
          <img
            src={props.imageContent}
            style={{
              width: "100%",
            }}
          />
        </div>
        <div className="post-reactions flex justify-content-space-between w-100">
          <Button
            style={{ textTransform: "none" }}
            color="error"
            startIcon={<FavoriteBorderRoundedIcon />}
          >
            Love 1.6L
          </Button>
          <Button
            style={{ textTransform: "none" }}
            startIcon={<CommentRoundedIcon />}
          >
            Comments 1.6K
          </Button>
          <Button
            style={{ textTransform: "none", color: "black" }}
            startIcon={<ShareRoundedIcon />}
          >
            Share 200
          </Button>
        </div>
        <div className="post-comments flex">
          {useAvatar(props.profileImg, 39, 39, props.userName, props.color)}
          <input
            type="text"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              padding: "10px",
              marginLeft: "8px",
              borderRadius: "20px",
            }}
            placeholder="What's your comment"
          />
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
        <MenuItem style={{ color: "#1976d2" }}>
          <EditRoundedIcon />
          &nbsp; Edit
        </MenuItem>
        <MenuItem style={{ color: "red" }}>
          <DeleteRoundedIcon /> &nbsp; Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default Post;
