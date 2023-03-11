import * as React from "react";
import useAutocomplete from "@mui/material/useAutocomplete";
import { styled } from "@mui/system";

const Input = styled("input")(({ theme }) => ({
  width: "100%",
  border: "none",
  outline: "none",
  padding: "10px",
  borderRadius: "20px",
  opacity: 0.7,
  ":focus": {
    opacity: 1,
  },
  ":not(:focus)": {
    opacity: 0.7,
  },
}));

const Listbox = styled("ul")(({ theme }) => ({
  margin: 0,
  padding: 10,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: "white",
  overflow: "auto",
  color: "black",
  borderRadius: "10px",
  maxHeight: 200,
  border: "1px solid rgba(0,0,0,.25)",
  "& li.Mui-focused": {
    backgroundColor: "#4a8df6",
    color: "black",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "black",
  },
  "::-webkit-scrollbar": {
    width: "10px",
  },

  "::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "100px",
  },

  "::-webkit-scrollbar-thumb": {
    borderRadius: "100px",
    background: "#888",
  },

  "::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
}));

function Search(props) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: props.options,
    getOptionLabel: (option) => option.title,
  });
  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
        }}
      >
        <div {...getRootProps()}>
          <Input placeholder="Search" {...getInputProps()} />
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li style={{ padding: 5 }} {...getOptionProps({ option, index })}>
                {option.title}
              </li>
            ))}
          </Listbox>
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default Search;
