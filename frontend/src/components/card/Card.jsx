import React from "react";
import "./Card.css";

function Card(props) {
  const className = props.className ? `card ${props.className}` : "card";
  return (
    <React.Fragment>
      <div className={className} id={props.id} style={props.style}>
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default Card;
