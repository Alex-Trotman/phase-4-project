import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Link,
import { MyContext } from "../MyContext";
import "../styles/Dashboard.css";

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
    <>
      <div className="card"></div>
      <div className="card"></div>
      <div className="card"></div>
      <div className="card"></div>
      <div className="card"></div>
      <div className="card"></div>
      {/* <Link to="/logout">Logout</Link> */}
    </>
  );
}

export default Dashboard;
