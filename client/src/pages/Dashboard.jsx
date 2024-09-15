import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Link,
import { MyContext } from "../MyContext";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { user, habits, fetchHabits } = useContext(MyContext);
  const [averagePerDaily, setAveragePerDaily] = useState(0);
  const navigate = useNavigate();

  const today = new Date();
  const year = today.getFullYear(); // Get the full year (e.g., 2024)
  const month = today.getMonth() + 1; // Get the month (0-11, so we add 1)
  const day = today.getDate(); // Get the day of the month (1-31)

  const date = `${year}-${month}-${day}`; // Example output: "2024-09-14"

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

    // 9-13-2024

    // <div className="dashboard-main grid grid-cols-1 grid-row-4 md:grid-cols-12 md:grid-rows-12 bg-slate-200 h-min max-w-7xl mx-auto p-2 md:gap-1">
    //   <div className="bg-white m-4 md:row-span-4 md:col-span-3 sm:col-span-12 rounded-lg"></div>
    //   <div className="bg-white m-4 md:row-span-4 md:col-span-6 sm:col-span-12 rounded-lg"></div>
    //   <div className="bg-white m-4 md:row-span-4 md:col-span-3 sm:col-span-12 rounded-lg"></div>

    //   {/* Fourth div with cards */}
    //   <div className="grid grid-cols-1 justify-center bg-white m-4 md:row-span-8 md:col-span-12 rounded-lg max-h-96 overflow-y-auto gap-1">
    //     {/* Card container */}
    //     {habits.map((habit) => {
    //       return <HabitCard habit={habit} />;
    //     })}
    //   </div>
    // </div>

    <div className="dashboard-main grid grid-rows-2 grid-cols-1 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-items-center gap-4 m-4">
        <div className="bg-white w-full h-96 rounded-3xl text-center content-center text-4xl">
          Today is {date}
        </div>
        <div className="bg-white w-full h-96 rounded-3xl text-center content-center text-7xl">
          2
        </div>
        <div className="bg-white w-full h-96 rounded-3xl text-center content-center text-7xl">
          3
        </div>
      </div>
      <div>
        {/* Fourth div with cards */}
        <div className="grid grid-cols-1 justify-center bg-white m-4 md:row-span-8 md:col-span-12 rounded-lg max-h-96 overflow-y-auto gap-1">
          {/* Card container */}
          {habits.map((habit) => {
            if (habit.metric_type === "boolean") {
              return <BooleanHabitCard key={habit.name} habit={habit} />;
            } else if (habit.metric_type === "numeric") {
              return null; //<NumericHabitCard key={habit.name} habit={habit} />;
            } else return null;
          })}
        </div>
      </div>
    </div>
  );
}

function BooleanHabitCard({ habit }) {
  const [weeklyLogs, setWeeklyLogs] = useState(
    Array(7).fill({ status: false, log_id: null })
  );
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    // Fetch all logs for the habit
    fetch(`/habits/${habit.id}/logs`)
      .then((response) => response.json())
      .then((data) => {
        // Filter logs for the current week
        const currentWeekLogs = filterLogsForCurrentWeek(data);
        setWeeklyLogs(currentWeekLogs);

        // Calculate and set the dates for the current week
        const dates = getDatesForCurrentWeek();
        setWeekDates(dates);
      });
  }, [habit.id]);

  const filterLogsForCurrentWeek = (logs) => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Get current day of the week (0 is Sunday, 6 is Saturday)

    // Set Monday as the start of the week
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
    ); // Adjust so Monday = 0

    startOfWeek.setHours(0, 0, 0, 0); // Set to start of the day

    const weeklyLogStatus = Array(7).fill({ status: false, log_id: null });

    logs.forEach((log) => {
      const logDate = new Date(log.log_date);
      const dayIndex = (logDate.getDay() + 6) % 7; // Adjust so Monday = 0 and Sunday = 6
      weeklyLogStatus[dayIndex] = { status: log.status, log_id: log.id };
    });

    return weeklyLogStatus;
  };

  const getDatesForCurrentWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Get current day of the week (0 is Sunday, 6 is Saturday)

    // Set Monday as the start of the week
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
    ); // Adjust so Monday = 0

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      weekDates.push(new Date(currentDate)); // Ensure each date is a new Date object
    }

    return weekDates;
  };

  // Format date as YYYY-MM-DD for backend usage
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2 digits
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
    return `${year}-${month}-${day}`;
  };

  // Format date for label as Sep-12
  const formatDateForLabel = (date) => {
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return `${month}-${day}`;
  };

  // Format date for just the day number
  const formatDayOnly = (date) => {
    return date.getDate();
  };

  const handleCheckboxChange = (dayIndex) => {
    const newLogs = [...weeklyLogs];
    const newStatus = !newLogs[dayIndex].status; // Toggle the current status
    const log_id = newLogs[dayIndex].log_id;

    // Update the status locally first
    newLogs[dayIndex] = { ...newLogs[dayIndex], status: newStatus };
    setWeeklyLogs(newLogs);

    const logDate = formatDate(weekDates[dayIndex]); // Format date as YYYY-MM-DD

    if (log_id) {
      // If the log exists, send a PUT request to update the status
      fetch(`/logs/${log_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          log_date: logDate,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(
            `Updated log for ${habit.name} on day ${dayIndex}:`,
            data
          );
        })
        .catch((error) => {
          console.error("Error updating log:", error);
        });
    } else {
      // Check if a log for this date already exists before creating a new one
      fetch(`/habits/${habit.id}/logs/by-date?log_date=${logDate}`)
        .then((response) => response.json())
        .then((existingLog) => {
          if (existingLog.message === "No log found for the given date") {
            // If no log exists, send a POST request to create a new log
            fetch(`/habits/${habit.id}/logs`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status: newStatus,
                log_date: logDate,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                // Update the log_id for this day once the log is created
                newLogs[dayIndex] = { ...newLogs[dayIndex], log_id: data.id };
                setWeeklyLogs(newLogs);
                console.log(
                  `Created new log for ${habit.name} on day ${dayIndex}:`,
                  data
                );
              })
              .catch((error) => {
                console.error("Error creating new log:", error);
              });
          } else {
            console.log(
              `Log already exists for ${logDate}. Skipping creation.`
            );
          }
        })
        .catch((error) => {
          console.error("Error checking existing log:", error);
        });
    }
  };

  return (
    <div className="bg-black text-white col-span-1 h-36 mx-3 my-2 p-5 rounded-lg flex justify-between items-center shadow-lg">
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-teal-400">{habit.name}</h4>
        <p className="text-sm text-gray-500">{habit.metric_type}</p>
      </div>
      <div className="flex-1">
        <div className="flex justify-around text-gray-500 mb-1">
          {weekDates.map((date, index) => (
            <span key={index} className="hover:text-teal-400">
              {/* On small screens, show day only. On larger screens, show full date */}
              <span className="block sm:hidden">{formatDayOnly(date)}</span>
              <span className="hidden sm:block">
                {formatDateForLabel(date)}
              </span>
            </span>
          ))}
        </div>
        <div className="flex justify-around">
          {weeklyLogs.map((log, index) => (
            <input
              key={index}
              type="checkbox"
              checked={log.status}
              onChange={() => handleCheckboxChange(index)} // Toggle status on change
              className="form-checkbox text-teal-400"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NumericHabitCard({ habit }) {
  function logHabit(x) {
    console.log(x);
  }
  return (
    <div className="bg-slate-700 col-span-1 h-32 mx-3 my-2 p-4 rounded-lg flex justify-between items-center">
      {/* Habit name and type on the left */}
      <div className="text-white">
        <h4 className="text-lg font-semibold">{habit.name}</h4>
        <p className="text-sm">{habit.metric_type}</p>
      </div>

      <button onClick={() => logHabit(habit)}>Click me</button>

      {/* Checkboxes spaced evenly with day labels */}
      <div className="flex flex-col justify-center">
        <div className="flex justify-between text-white mb-1">
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
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
  );
}
