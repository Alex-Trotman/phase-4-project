import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";

function Logout() {
  const { setUser } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/logout", {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          navigate("/");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  }, [setUser, navigate]);

  return <div>Logging out...</div>;
}

export default Logout;
