import ProfilePage from "./ProfilePage.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";

function SearchPage(props) {
  const [username, setUsername] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [profileColor, setProfileColor] = useState("");
  const [about, setAbout] = useState("");
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState("");
  const [followersCount, setFollowersCount] = useState();
  const [followingsCount, setFollowingsCount] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [connectionData, setConnectionData] = useState();
  const [isYouFollowing, setIsYouFollowing] = useState();
  const [tagName, setTagName] = useState("");
  const { tag_name } = useParams();

  useEffect(() => {
    fetch(`/api/user?tag_name=${tag_name}`, {
      headers: {
        "content-type": "application/json&charset=utf-8",
      },
      method: "GET",
    })
      .then((responce) => {
        if (responce.ok) {
          return responce.json();
        }
      })
      .then((data) => {
        setUsername(data.name);
        setUserId(data.id);
        setProfileImg(data.profile_img);
        setProfileColor(data.profile_color);
        setAbout(data.about);
        setEmail(data.email);
        setIsYouFollowing(data.is_you_following);
        setTagName(data.tag_name);
        getFollowData(data.id);
      });
  }, []);

  const getFollowData = (id) => {
    const fellowUrl = "/api/follow";
    fetch(`${fellowUrl}?user_id=${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setConnectionData(data);
        setFollowersCount(data.followers_count);
        setFollowingsCount(data.followings_count);
      });
  };

  const handleFollowRequest = () => {
    fetch(`/api/follow`, {
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify({ following_id: userId }),
    }).then((responce) => {
      if (responce.ok) {
        setOpenAlert(true);
        setAlertMessage(`You are following ${username}`);
        setAlertStatus("success");
        setFollowersCount(followersCount + 1);
        setIsYouFollowing(true);
      } else {
        setOpenAlert(true);
        setAlertMessage(`Something went wrong :(`);
        setAlertStatus("error");
      }
    });
  };

  const handleUnfollowRequet = () => {
    fetch(`/api/follow`, {
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
      method: "DELETE",
      body: JSON.stringify({ following_id: userId }),
    }).then((responce) => {
      if (responce.ok) {
        setOpenAlert(true);
        setAlertMessage(`You unfollowed ${username}`);
        setAlertStatus("success");
        setFollowersCount(followersCount - 1);
        setIsYouFollowing(false);
      } else {
        setOpenAlert(true);
        setAlertMessage(`Something went wrong :(`);
        setAlertStatus("error");
      }
    });
  };
  console.log(props);

  return (
    <>
      <ProfilePage
        userName={username}
        profileImg={profileImg}
        color={profileColor}
        name={username}
        email={email}
        about={about}
        isNotCurrentUserProfile={true}
        tagName={tagName}
        userId={userId}
        followersCount={followersCount}
        isYouFollowing={isYouFollowing}
        followingsCount={followingsCount}
        handleFollowRequest={handleFollowRequest}
        handleUnfollowRequet={handleUnfollowRequet}
        currentUserProfile={props.profileImg}
        currentUserName={props.userName}
        currentUserColor={props.color}
      />
      <Collapse
        style={{
          position: "absolute",
          bottom: 1,
          left: 1,
        }}
        in={openAlert}
      >
        <Alert
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity={alertStatus}
        >
          {alertMessage}
        </Alert>
      </Collapse>
    </>
  );
}

export default SearchPage;
