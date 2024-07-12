import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";

function Dashboard() {
  const { user } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("Setting timer");
      const loadingTimeLimit = 1000;
      const timer = setTimeout(() => {
        navigate("/login");
      }, loadingTimeLimit);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>User: {user.username}</h1>
      <h1>User: {user._password_hash}</h1>

      <Link to="/habits">Habits</Link>
      <br />
      <Link to="/categories">Categories</Link>
      <br />
      <Link to="/logout">Logout</Link>
    </div>
  );
}

export default Dashboard;
