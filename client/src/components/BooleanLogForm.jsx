import React, { useState } from "react";

const BooleanLogForm = ({ habitId, logs, setLogs, onNewLog }) => {
  const [newLog, setNewLog] = useState("");
  const [logDate, setLogDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logData = {
      log_date: logDate,
      status: newLog === "true",
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
        onNewLog(newLog);
        setNewLog("");
        setLogDate("");
      } else {
        console.error("Failed to create log");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sortedLogs = logs
    .slice()
    .sort((a, b) => new Date(b.log_date) - new Date(a.log_date));

  return (
    <>
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
          Status:
          <select
            value={newLog}
            onChange={(e) => setNewLog(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
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
            {sortedLogs.map((log) => (
              <tr key={log.id} className="log-item">
                <td>{new Date(log.log_date).toLocaleDateString()}</td>
                <td>{log.status ? "✔️" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BooleanLogForm;
