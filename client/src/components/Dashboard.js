import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch("http://127.0.0.1:5555/session", {
  //     credentials: "include", // This ensures cookies are sent with the request
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Unauthorized");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.error) {
  //         navigate("/login");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("There was an error checking session status!", error);
  //       navigate("/login");
  //     });
  // }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/habits">Habits</Link>
      <br />
      <Link to="/categories">Categories</Link>
      <br />
      <Link to="/logout">Logout</Link>
    </div>
  );
}

export default Dashboard;
