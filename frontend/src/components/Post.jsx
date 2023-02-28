import React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";

function Post(props) {
  return (
    <React.Fragment>
      <Card id={props.id}></Card>
    </React.Fragment>
  );
}

export default Post;
