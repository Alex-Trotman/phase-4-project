import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5555/logout", {
      method: "DELETE",
    })
      .then(response => {
        if (response.ok) {
          navigate("/");
        } else {
          console.error("Logout failed");
        }
      })
      .catch(error => {
        console.error("Error during logout:", error);
      });
  }, [navigate]);

  return <div>Logging out...</div>;
}

export default Logout;
