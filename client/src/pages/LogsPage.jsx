import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../MyContext";
import "../styles/Logs.css";

function LogsPage() {
  const { habits, setHabits } = useContext(MyContext);
  const { habitId } = useParams();
  const habit = habits.find((habit) => habit.id.toString() === habitId);
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState("");
  const [logDate, setLogDate] = useState("");
  
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`/habits/${habitId}/logs`);
        if (response.ok) {
          const data = await response.json();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logData = {
      value: newLog,
      log_date: logDate,
    };

    try {
      const response = await fetch(`/habits/${habitId}/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logData),
      });

      if (response.ok) {
        const newLog = await response.json();
        setLogs((prevLogs) => [...prevLogs, newLog]);
        setNewLog("");
        setLogDate("");
      } else {
        console.error("Failed to create log");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {habit ? (
        <>
          <h1>Habit: {habit.name}</h1>
          <form onSubmit={handleSubmit} className="log-form">
            <label>
              Log Date:
              <input
                type="date"
                value={logDate}
                onChange={(e) => setLogDate(e.target.value)}
                required
              />
            </label>
            <label>
              Value:
              {habit.metric_type === "boolean" ? (
                <select
                  value={newLog}
                  onChange={(e) => setNewLog(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              ) : (
                <input
                  type="number"
                  value={newLog}
                  onChange={(e) => setNewLog(e.target.value)}
                  required
                />
              )}
            </label>
            <button type="submit">Add Log</button>
          </form>
          <div className="table-container">
            <table className="log-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="log-item">
                    <td>{log.log_date}</td>
                    <td>
                      {habit.metric_type === "boolean" ? (
                        log.value === "true" ? "✔️" : "❌"
                      ) : (
                        log.value
                      )}
                    </td>
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
