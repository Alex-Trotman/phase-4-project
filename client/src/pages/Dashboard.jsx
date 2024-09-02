import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Link,
import { MyContext } from "../MyContext";
import "../styles/Dashboard.css";

function Dashboard() {
  const { user, habits, fetchHabits } = useContext(MyContext);
  const [averagePerDaily, setAveragePerDaily] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHabits();
    fetch("/api/habits/average-per-daily")
      .then((response) => response.json())
      .then((data) => {
        setAveragePerDaily(data.average_per_daily);
        console.log("HERE", data.average_per_daily);
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

  console.log(habits);

  return (
    <div className="dashboard-main grid grid-cols-1 grid-rows-2 sm:grid-cols-2 md:grid-cols-3 bg-slate-200 h-full">
      <div className="card flex items-center justify-center bg-slate-400 m-4 rounded-lg hover:bg-stone-400 min-h-96">
        {habits.length} Total habits
      </div>
      <div className="card flex items-center justify-center bg-slate-400 m-4 rounded-lg hover:bg-stone-400 min-h-96">
        X Perfect days
      </div>
      <div className="card flex items-center justify-center bg-slate-400 m-4 rounded-lg hover:bg-stone-400 min-h-96">
        {averagePerDaily} Average Per Daily
      </div>
      <div className="card flex items-center justify-center sm:row-span-1 sm:col-span-1 col-span-1 row-span-1 bg-slate-400 m-4 rounded-lg hover:bg-stone-400 min-h-96">
        X Total Streaks
      </div>
      <div className="card flex items-center justify-center bg-slate-400 m-4 rounded-lg hover:bg-stone-400 min-h-96">
        Lorem ipsum dolor sit amet consectetur
      </div>
      <div className="card flex items-center justify-center bg-slate-400 m-4 rounded-lg hover:bg-stone-400 min-h-96">
        Lorem ipsum dolor sit amet consectetur
      </div>
      {/* <Link to="/logout">Logout</Link> */}
    </div>
  );
}

export default Dashboard;
