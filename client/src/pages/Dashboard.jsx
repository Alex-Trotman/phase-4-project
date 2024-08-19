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
      <div className="card flex items-center justify-center text-4xl hover:bg-stone-400">
         X Total habits
      </div>
      <div className="card flex items-center justify-center text-4xl hover:bg-stone-400">
        X Perfect days
      </div>
      <div className="card flex items-center justify-center text-4xl hover:bg-stone-400">
        X.XX Average Per Daily
      </div>
      <div className="card flex items-center justify-center text-4xl hover:bg-stone-400">
        X Total Streaks
      </div>
      <div className="card flex items-center justify-center text-4xl hover:bg-stone-400">
        5
      </div>
      <div className="card flex items-center justify-center text-4xl hover:bg-stone-400">
        6
      </div>
      {/* <Link to="/logout">Logout</Link> */}
    </>
  );
}

export default Dashboard;
