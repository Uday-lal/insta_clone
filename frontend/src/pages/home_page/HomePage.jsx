import React from "react";
import { useEffect, useState } from "react";
import ResponsiveAppBar from "../../components/appBar/appBar.jsx";

function HomePage() {
  const [username, setUsername] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [profileColor, setProfileColor] = useState("");

  useEffect(() => {
    const url = "/api/user";
    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }).then((responce) => {
      if (responce.ok) {
        responce.json().then((data) => {
          setUsername(data.name);
          setProfileImg(data.profile_img);
          setProfileColor(data.profile_color);
        });
      } else {
        // ...
      }
    });
  }, []);
  return (
    <React.Fragment>
      <div className="page">
        <ResponsiveAppBar
          userName={username}
          profileImg={profileImg}
          color={profileColor}
        />
      </div>
    </React.Fragment>
  );
}

export default HomePage;
