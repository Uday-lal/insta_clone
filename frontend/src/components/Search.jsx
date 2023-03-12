import * as React from "react";
import useAutocomplete from "@mui/material/useAutocomplete";
import { useRef } from "react";
import useAvatar from "../hooks/useAvatar.jsx";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
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
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: "white",
  overflow: "auto",
  color: "black",
  borderRadius: "10px",
  maxHeight: 200,
  border: "1px solid rgba(0,0,0,.25)",
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
    getOptionLabel: (option) => option.name,
  });
  const ref = useRef();
  return (
    <>
      <div
        ref={ref}
        onChange={props.onChange}
        onBlur={props.onBlur}
        style={{
          width: "100%",
        }}
      >
        <div {...getRootProps()}>
          <Input placeholder="Search" {...getInputProps()} />
          {groupedOptions.length > 0 ? (
            <Listbox
              style={{ width: ref.current.offsetWidth }}
              {...getListboxProps()}
            >
              {groupedOptions.map((option, index) => (
                <>
                  <ListItemButton
                    onClick={() =>
                      window.location.replace(`/profile/${option.tag_name}`)
                    }
                  >
                    <ListItem>
                      <ListItemAvatar>
                        {useAvatar(
                          option.profile_img,
                          null,
                          null,
                          option.name,
                          option.color
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        primary={option.name}
                        secondary={option.tag_name}
                      />
                    </ListItem>
                  </ListItemButton>
                  <Divider variant="inset" component="li" />
                </>
              ))}
            </Listbox>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Search;
