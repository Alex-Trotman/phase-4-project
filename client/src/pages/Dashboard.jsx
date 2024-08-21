import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Link,
import { MyContext } from "../MyContext";
import "../styles/Dashboard.css";

function Dashboard() {
  const { user, habits } = useContext(MyContext);
  const [averagePerDaily, setAveragePerDaily] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/habits/average-per-daily')
        .then(response => response.json())
        .then(data => {
          setAveragePerDaily(data.average_per_daily)
          console.log("HERE", data.average_per_daily)
        });
  }, []);

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

  console.log(habits)

  return (
    <div className="dashboard-main">
      <div className="card flex items-center justify-center text-4xl hover:bg-stone-400">
         {habits.length} Total habits
      </div>
      <div className="card flex items-center justify-center text-4xl hover:bg-stone-400">
        X Perfect days
      </div>
      <div className="card flex items-center justify-center text-4xl hover:bg-stone-400">
        {averagePerDaily} Average Per Daily
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
    </div>
  );
}

export default Dashboard;
