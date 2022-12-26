import React from "react";

function Search(props) {
  return (
    <React.Fragment>
      <input
        type="text"
        onChange={props.onChange}
        style={{
          width: "100%",
        }}
        placeholder="Search"
      />
    </React.Fragment>
  );
}

export default Search;
