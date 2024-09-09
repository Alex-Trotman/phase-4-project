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
    // <div className="dashboard-main grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-slate-200 h-full gap-4">
    //   <div className="card flex items-center justify-center bg-slate-400 m-4 rounded-lg hover:bg-stone-400 min-h-48">
    //     {habits.length} Total habits
    //   </div>
    //   <div className="card flex items-center justify-center bg-slate-400 m-4 rounded-lg hover:bg-stone-400 min-h-48">
    //     X Perfect days
    //   </div>
    //   <div className="card flex items-center justify-center bg-slate-400 m-4 rounded-lg hover:bg-stone-400 min-h-48">
    //     {averagePerDaily} Average Per Daily
    //   </div>
    //   <div className="card flex items-center justify-center sm:row-span-1 sm:col-span-1 col-span-1 row-span-1 bg-slate-400 m-4 rounded-lg hover:bg-stone-400 min-h-48">
    //     X Total Streaks
    //   </div>
    //   <div className="card flex items-center justify-center bg-slate-400 m-4 rounded-lg hover:bg-stone-400 min-h-48">
    //     Lorem ipsum dolor sit amet consectetur
    //   </div>
    //   <div className="card flex items-center justify-center bg-slate-400 m-4 rounded-lg hover:bg-stone-400 min-h-48">
    //     Lorem ipsum dolor sit amet consectetur
    //   </div>
    //   {/* <Link to="/logout">Logout</Link> */}
    // </div>
    <div className="dashboard-main grid grid-cols-1 grid-row-4 md:grid-cols-12 md:grid-rows-12 bg-slate-200 h-full md:gap-1">
      <div className="bg-white m-4 md:row-span-4 md:col-span-3 sm:col-span-12 rounded-lg"></div>
      <div className="bg-white m-4 md:row-span-4 md:col-span-6 sm:col-span-12 rounded-lg"></div>
      <div className="bg-white m-4 md:row-span-4 md:col-span-3 sm:col-span-12 rounded-lg"></div>

      {/* Fourth div with cards */}
      <div className="grid grid-cols-1 justify-center bg-white m-4 md:row-span-8 md:col-span-12 rounded-lg h-full gap-1">
        {/* Card container */}
        <div className="bg-slate-500 col-span-1 h-32 mx-3 my-2 p-4 rounded-lg flex justify-between items-center">
          {/* Habit name and type on the left */}
          <div className="text-white">
            <h4 className="text-lg font-semibold">Habit name</h4>
            <p className="text-sm">Habit type</p>
          </div>

          {/* Checkboxes spaced evenly with day labels */}
          <div className="flex flex-col justify-center">
            <div className="flex justify-between text-white mb-1">
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
            </div>
            <div className="flex justify-between space-x-2">
              <input
                type="checkbox"
                name=""
                id=""
                className="form-checkbox text-blue-600"
              />
              <input
                type="checkbox"
                name=""
                id=""
                className="form-checkbox text-blue-600"
              />
              <input
                type="checkbox"
                name=""
                id=""
                className="form-checkbox text-blue-600"
              />
              <input
                type="checkbox"
                name=""
                id=""
                className="form-checkbox text-blue-600"
              />
              <input
                type="checkbox"
                name=""
                id=""
                className="form-checkbox text-blue-600"
              />
              <input
                type="checkbox"
                name=""
                id=""
                className="form-checkbox text-blue-600"
              />
              <input
                type="checkbox"
                name=""
                id=""
                className="form-checkbox text-blue-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
