import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";

function Dashboard() {
  const { user } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("User is not set, navigating to /login", user);
      navigate("/login");
    } else {
      console.log("User is set", user);
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Optionally, render null or a loading spinner while redirecting
  }

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
