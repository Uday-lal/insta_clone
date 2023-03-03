import React from "react";

function Search(props) {
  return (
    <React.Fragment>
      <input
        type="text"
        onChange={props.onChange}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          padding: "10px",
          borderRadius: "20px",
          opacity: 0.7,
        }}
        onClick={(e) => (e.target.style.opacity = 1)}
        onBlur={(e) => (e.target.style.opacity = 0.7)}
        placeholder="Search"
      />
    </React.Fragment>
  );
}

export default Search;
