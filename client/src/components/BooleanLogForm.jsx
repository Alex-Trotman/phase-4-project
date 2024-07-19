import React, { useState } from "react";

const BooleanLogForm = ({ habitId, onNewLog }) => {
  const [newLog, setNewLog] = useState("");
  const [logDate, setLogDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logData = {
      status: newLog === "true" ? true : newLog === "false" ? false : null,
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
  );
};

export default BooleanLogForm;
