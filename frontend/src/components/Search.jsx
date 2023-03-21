import * as React from "react";
import useAvatar from "../hooks/useAvatar.jsx";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import List from "@mui/material/List";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";

const useStyles = makeStyles({
  topScrollPaper: {
    alignItems: "flex-start",
  },
  topPaperScrollBody: {
    verticalAlign: "top",
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Search(props) {
  const classes = useStyles();
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        TransitionComponent={Transition}
        sx={{
          maxHeight: "60vh",
          height: "60vh",
        }}
        scroll="paper"
        open={props.open}
        onClose={props.onClose}
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <DialogTitle>Search Users</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              className="serach-section"
              sx={{
                width: "70%",
              }}
            >
              <Box className="w-100 urs-input-cover">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SearchRoundedIcon className="text-secondary" />
                </Box>
                <Box className="w-100">
                  <input
                    type="text"
                    className="urs-input-styles"
                    placeholder="Search Users"
                    onChange={props.onChange}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              className="options"
              sx={{
                width: "70%",
              }}
            >
              <List>
                {props.options.length !== 0 &&
                  props.options.map((option, index) => (
                    <>
                      <ListItemButton
                        component={"a"}
                        href={`/profile/${option.tag_name}`}
                        key={index}
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
                {props.options.length === 0 && (
                  <>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      <img
                        src="/static/img/no_user_found.svg"
                        alt="no_user_found"
                        style={{
                          width: "30%",
                          height: "30%",
                        }}
                      />
                      <h2
                        style={{
                          marginTop: "20px",
                        }}
                      >
                        No User Found
                      </h2>
                    </Box>
                  </>
                )}
              </List>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Search;
