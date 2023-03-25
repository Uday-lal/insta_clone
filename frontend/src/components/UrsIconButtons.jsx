import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/system";

class UrsIconButtons {
  PrimaryIconButton = styled(IconButton)({
    backgroundColor: "rgb(25, 118, 210)",
    "&:hover": {
      backgroundColor: "rgb(25, 118, 210)",
    },
  });

  DangerIconButton = styled(IconButton)({
    backgroundColor: "rgb(244, 67, 54)",
    "&:hover": {
      backgroundColor: "rgb(244, 67, 54)",
    },
  });

  SuccessIconButton = styled(IconButton)({
    backgroundColor: "rgb(102, 187, 106)",
    "&:hover": {
      backgroundColor: "rgb(102, 187, 106)",
    },
  });
}

const IconButtons = new UrsIconButtons();

export default IconButtons;
