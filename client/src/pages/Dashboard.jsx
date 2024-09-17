import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Link,
import { MyContext } from "../MyContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
    <div className="dashboard-main grid grid-rows-2 grid-cols-1 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-items-center gap-4 m-4">
        <div className="bg-white w-full h-96 rounded-3xl text-center content-center text-4xl">
          Yesterday's stats
        </div>
        <div className="bg-white w-full h-96 rounded-3xl text-center content-center text-4xl">
          Today's stats
        </div>
        <div className="bg-white w-full h-96 rounded-3xl text-center content-center text-4xl">
          Today is {date}
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
              return <NumericHabitCard key={habit.name} habit={habit} />;
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
  const [loading, setLoading] = useState(true); // New loading state

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

        setLoading(false); // Stop loading once the data is fetched
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
        <h4 className="text-lg font-semibold text-teal-400">
          {loading ? <Skeleton width={100} /> : habit.name}{" "}
          {/* Skeleton for habit name */}
        </h4>
        <p className="text-sm text-gray-500">
          {loading ? <Skeleton width={60} /> : habit.metric_type}{" "}
          {/* Skeleton for metric type */}
        </p>
      </div>
      <div className="flex-1">
        <div className="flex justify-around text-gray-500 mb-1">
          {weekDates.map((date, index) => (
            <span key={index} className="hover:text-teal-400">
              {loading ? (
                <Skeleton width={20} />
              ) : (
                <>
                  <span className="block sm:hidden">{formatDayOnly(date)}</span>
                  <span className="hidden sm:block">
                    {formatDateForLabel(date)}
                  </span>
                </>
              )}
            </span>
          ))}
        </div>
        <div className="flex justify-around">
          {weeklyLogs.map((log, index) =>
            loading ? (
              <Skeleton circle={true} width={24} height={24} key={index} />
            ) : (
              <input
                key={index}
                type="checkbox"
                checked={log.status}
                onChange={() => handleCheckboxChange(index)}
                className="form-checkbox h-6 w-6 text-teal-500 focus:ring-2 focus:ring-teal-400 transition-all"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

function NumericHabitCard({ habit }) {
  const [weeklyLogs, setWeeklyLogs] = useState(
    Array(7).fill({ value: "", log_id: null })
  );
  const [weekDates, setWeekDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/habits/${habit.id}/data`)
      .then((response) => response.json())
      .then((data) => {
        const currentWeekLogs = filterLogsForCurrentWeek(data);
        setWeeklyLogs(currentWeekLogs);

        const dates = getDatesForCurrentWeek();
        setWeekDates(dates);

        setLoading(false); // Stop loading once the data is fetched
      })
      .catch((error) => {
        console.error("Error fetching habit data:", error);
        setLoading(false); // Stop loading even in case of an error
      });
  }, [habit.id]);

  const filterLogsForCurrentWeek = (logs) => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
    );

    const weeklyLogValues = Array(7).fill({ value: "", log_id: null });

    logs.forEach((log) => {
      const logDate = new Date(log.log_date);
      const dayIndex = (logDate.getDay() + 6) % 7;
      weeklyLogValues[dayIndex] = {
        value: log.metric_value || "",
        log_id: log.id,
      };
    });

    return weeklyLogValues;
  };

  const getDatesForCurrentWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
    );

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      weekDates.push(new Date(currentDate));
    }

    return weekDates;
  };

  // Add this function back
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateForLabel = (date) => {
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return `${month}-${day}`;
  };

  const formatDayOnly = (date) => {
    return date.getDate();
  };

  const handleInputChange = (dayIndex, event) => {
    const newLogs = [...weeklyLogs];
    const newValue = event.target.value;
    const log_id = newLogs[dayIndex].log_id;

    newLogs[dayIndex] = { ...newLogs[dayIndex], value: newValue };
    setWeeklyLogs(newLogs);

    const logDate = formatDate(weekDates[dayIndex]);

    if (log_id) {
      fetch(`/data/${log_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metric_value: newValue,
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
      fetch(`/habits/${habit.id}/logs/by-date?log_date=${logDate}`)
        .then((response) => response.json())
        .then((existingLog) => {
          if (existingLog.message === "No log found for the given date") {
            fetch(`/habits/${habit.id}/data`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                metric_value: newValue,
                log_date: logDate,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
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
    <div className="bg-black text-white col-span-1 h-36 mx-3 my-2 p-5 rounded-lg w-full overflow-hidden shadow-lg flex justify-between items-center flex-wrap">
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-teal-400">
          {loading ? <Skeleton width={100} /> : habit.name}
        </h4>
        <p className="text-sm text-gray-500">
          {loading ? <Skeleton width={60} /> : habit.metric_type}
        </p>
      </div>
      <div className="flex-1">
        <div className="flex justify-around text-gray-500 mb-1 flex-wrap">
          {weekDates.map((date, index) => (
            <span key={index} className="hover:text-teal-400">
              {loading ? (
                <Skeleton width={20} />
              ) : (
                <>
                  <span className="block sm:hidden">{formatDayOnly(date)}</span>
                  <span className="hidden sm:block">
                    {formatDateForLabel(date)}
                  </span>
                </>
              )}
            </span>
          ))}
        </div>
        <div className="flex justify-around flex-wrap">
          {weeklyLogs.map((log, index) =>
            loading ? (
              <Skeleton circle={true} width={24} height={24} key={index} />
            ) : (
              <input
                key={index}
                type="number"
                value={log.value}
                onChange={(e) => handleInputChange(index, e)}
                className="form-input text-teal-400 w-12 border-b border-teal-400 bg-transparent focus:outline-none"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
