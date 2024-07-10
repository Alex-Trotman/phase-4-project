import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5555/logout", {
      method: "POST",
      credentials: "include", // This ensures cookies are sent with the request
    })
      .then((response) => {
        if (response.ok) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("There was an error logging out!", error);
      });
  }, [navigate]);

  return <div>Logging out...</div>;
}

export default Logout;
