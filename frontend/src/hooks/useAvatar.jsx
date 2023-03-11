import Avatar from "@mui/material/Avatar";

function useAvatar(profileImg, width, height, userName, color, fontSize) {
  if (profileImg) {
    return (
      <Avatar
        src={`/static/uploads/profile_imgs/${profileImg}`}
        alt="Profile Img"
        sx={{ width: width, height: height }}
      />
    );
  } else {
    return (
      <Avatar
        sx={{
          bgcolor: color,
          width: width,
          height: height,
          fontSize: fontSize,
        }}
      >
        {userName[0]}
      </Avatar>
    );
  }
}

export default useAvatar;
