import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/session", {
      credentials: "include", // This ensures cookies are sent with the request
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setIsAuthenticated(false);
          navigate("/login");
        } else {
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        console.error("There was an error checking session status!", error);
        setIsAuthenticated(false);
        navigate("/login");
      });
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
