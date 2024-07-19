import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../MyContext";
import BooleanLogForm from "../components/BooleanLogForm";
import MetricLogForm from "../components/MetricLogForm";
import "../styles/Logs.css";

function LogsPage() {
  const { habits } = useContext(MyContext);
  const { habitId } = useParams();
  const habit = habits.find((habit) => habit.id.toString() === habitId);
  const [logs, setLogs] = useState([]);
  const [habitData, setHabitData] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`/habits/${habitId}/logs`);
        if (response.ok) {
          const data = await response.json();
          data.sort((a, b) => new Date(a.log_date) - new Date(b.log_date)); // Sort logs by date
          setLogs(data);
        } else {
          console.error("Failed to fetch logs");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLogs();
  }, [habitId]);

  useEffect(() => {
    const fetchHabitData = async () => {
      try {
        const response = await fetch(`/habits/${habitId}/data`);
        if (response.ok) {
          const data = await response.json();
          data.sort((a, b) => new Date(a.log_date) - new Date(b.log_date)); // Sort habit data by date
          setHabitData(data);
        } else {
          console.error("Failed to fetch habit data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchHabitData();
  }, [habitId]);

  const handleNewLog = (newLog) => {
    setLogs((prevLogs) => {
      const updatedLogs = [...prevLogs, newLog];
      updatedLogs.sort((a, b) => new Date(a.log_date) - new Date(b.log_date)); // Sort logs by date
      return updatedLogs;
    });
  };

  const handleNewData = (newData) => {
    setHabitData((prevData) => {
      const updatedData = [...prevData, newData];
      updatedData.sort((a, b) => new Date(a.log_date) - new Date(b.log_date)); // Sort habit data by date
      return updatedData;
    });
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <div>
      {habit ? (
        <>
          <h1>Habit: {habit.name}</h1>
          {habit.metric_type === "boolean" ? (
            <BooleanLogForm habitId={habitId} onNewLog={handleNewLog} />
          ) : (
            <MetricLogForm habitId={habitId} onNewLog={handleNewData} />
          )}
          <div className="table-container">
            <table className="log-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {habit.metric_type === "boolean"
                  ? logs.map((log) => (
                      <tr key={log.id} className="log-item">
                        <td>{formatDateTime(log.log_date)}</td>
                        <td>{String(log.status) === "true" ? "✔️" : "❌"}</td>
                      </tr>
                    ))
                  : habitData.map((data) => (
                      <tr key={data.id} className="log-item">
                        <td>{formatDateTime(data.log_date)}</td>
                        <td>{String(data.metric_value)}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h1>Habit not found</h1>
      )}
    </div>
  );
}

export default LogsPage;
