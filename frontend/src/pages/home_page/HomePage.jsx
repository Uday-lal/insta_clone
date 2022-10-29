import React from "react";
import { useEffect, useState } from "react";

function HomePage() {
  const [username, setUsername] = useState("");

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
        });
      } else {
        // ...
      }
    });
  }, []);
  return (
    <React.Fragment>
      <div className="page">
        <h1>Hi, {username}</h1>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
