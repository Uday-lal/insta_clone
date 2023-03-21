import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import useAvatar from "../../hooks/useAvatar.jsx";

function ProfileCard(props) {
  props.width = 80;
  props.height = 80;

  return (
    <Card
      sx={{
        padding: "30px 14px",
        position: "sticky",
        top: 90,
      }}
    >
      <div className="upper-postion flex">
        <Box>
          {useAvatar(props.profileImg, 80, 80, props.userName, props.color, 25)}
        </Box>
        <Box>
          <Box className="flex" style={{ marginLeft: 10 }}>
            <Box>
              <h3 style={{ fontWeight: "revert" }}>{props.userName}</h3>
              <p
                className="text-secondary"
                style={{ fontSize: 14, marginTop: 3 }}
              >
                {props.tagName}
              </p>
            </Box>
            <Box>
              {props.isNotCurrentUserProfile &&
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
          <Box className="flex" style={{ marginLeft: 10, marginTop: 10 }}>
            <Box className="flex center">
              <h4>{props.followersCount}</h4>
              &nbsp;
              <span style={{ fontSize: 12 }} className="text-secondary">
                Followers
              </span>
            </Box>
            <Box className="flex center" style={{ marginLeft: 10 }}>
              <h4>{props.followingsCount}</h4>
              &nbsp;
              <span style={{ fontSize: 12 }} className="text-secondary">
                Following
              </span>
            </Box>
            <Box className="flex center" style={{ marginLeft: 10 }}>
              <h4>{props.postCount}</h4>
              &nbsp;
              <span style={{ fontSize: 12 }} className="text-secondary">
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
  );
}

export default ProfileCard;
