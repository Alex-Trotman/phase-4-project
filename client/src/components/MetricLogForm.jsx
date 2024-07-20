import React, { useState } from "react";

const MetricLogForm = ({ habitId, habitData, setHabitData, onNewLog }) => {
  const [newLog, setNewLog] = useState("");
  const [logDate, setLogDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logData = {
      log_date: logDate,
      metric_value: parseFloat(newLog),
    };

    try {
      const response = await fetch(`/habits/${habitId}/data`, {
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

  const sortedHabitData = habitData
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
          Value:
          <input
            type="number"
            value={newLog}
            onChange={(e) => setNewLog(e.target.value)}
            required
          />
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
            {sortedHabitData.map((data) => (
              <tr key={data.id} className="log-item">
                <td>{new Date(data.log_date).toLocaleDateString()}</td>
                <td>{data.metric_value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MetricLogForm;
