import React, { useState } from "react";

const MetricLogForm = ({ habitId, onNewLog }) => {
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

  return (
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
  );
};

export default MetricLogForm;
