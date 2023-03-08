import React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

function ProfileCard(props) {
  const returnAvatar = (width, height) => {
    if (props.profileImg) {
      return (
        <Avatar
          src={`/static/uploads/profile_imgs/${props.profileImg}`}
          alt="Profile Img"
          sx={{ width: width, height: height }}
        />
      );
    } else {
      return (
        <Avatar
          sx={{
            bgcolor: props.color,
            width: width,
            height: height,
            fontSize: 30,
          }}
        >
          {props.userName[0]}
        </Avatar>
      );
    }
  };
  props.width = 80;
  props.height = 80;

  return (
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
  );
}

export default ProfileCard;
