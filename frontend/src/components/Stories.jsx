import Card from "@mui/material/Card";
import useAvatar from "../hooks/useAvatar.jsx";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { styled } from "@mui/system";

const AddImageIconButton = styled(IconButton)({
  position: "absolute",
  bottom: "1px",
  right: "1px",
  backgroundColor: "rgb(25, 118, 210)",
  width: "25px",
  height: "25px",
  "&:hover": {
    backgroundColor: "rgb(25, 118, 210)",
  },
});

function Stories(props) {
  return (
    <Card className="flex p-15 w-100">
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <AddImageIconButton size="small">
            <AddRoundedIcon
              sx={{ color: "white", width: "20px", height: "20px" }}
              size="small"
            />
          </AddImageIconButton>
        }
      >
        {useAvatar(props.profileImg, 72, 72, props.userName, props.color, 15)}
      </Badge>
    </Card>
  );
}

export default Stories;
